import gitRawCommits from 'git-raw-commits'
import gitLatestTag from 'git-latest-semver-tag'
import commitsParser from 'conventional-commits-parser'
import commitsFilter from 'conventional-commits-filter'
import concat from 'concat-stream'
import { forEach, separator, log, clear } from '../../util'

function incrementName (code) {
  switch (code) {
    case 1: return 'patch'
    case 2: return 'minor'
    case 3: return 'major'
    default: return ''
  }
}

export const checkRelease = function (packages) {
  const status = {}

  packages.forEach(function (packageName) {
    status[packageName] = {
      increment: 0, // 0 = nothing, 1 = patch, 2 = minor, 3 = major
      commits: []
    }
  })

  return latestTag()
    .catch(err => console.log(err))
    .then(rawCommits)
    .catch(() => {
      showReportHeaderNegative()
      console.log(separator())
    })
    .then((commits) => getStatus(packages, commits))
    .then((status) => {
      const packageNames = Object.keys(status)

      let headerShown = false
      forEach(packageNames, function (packageName) {
        if (status[packageName].increment > 0) {
          if (!headerShown) {
            showReportHeaderPositive()
            headerShown = true
          }

          log('`' + packageName + '` needs a new ' +
            incrementName(status[packageName].increment).toUpperCase() +
            ' version released because:')

          forEach(status[packageName].commits, function (commit) {
            log('  - ' + commit.header)
            if (isCommitBreakingChange(commit)) {
              log('    BREAKING CHANGE')
            }
          })
        }
      })

      console.log(separator())
      return status
    })
}

export function isCommitBreakingChange (commit) {
  return (typeof commit.footer === 'string' &&
    commit.footer.indexOf('BREAKING CHANGE') !== -1)
}

export function getStatus (packages, commits) {
  const status = {}

  forEach(packages, function (packageName) {
    status[packageName] = {
      increment: 0, // 0 = nothing, 1 = patch, 2 = minor, 3 = major
      commits: []
    }
  })

  for (let i = commits.length - 1; i >= 0; --i) {
    const commit = commits[i]

    console.log(commit)

    if (packages.indexOf(commit.scope) === -1) continue

    const packageName = commit.scope
    let toPush = null
    if (commit.type === 'fix' || commit.type === 'perf') {
      status[packageName].increment = Math.max(status[packageName].increment, 1)
      toPush = commit
    }
    if (commit.type === 'feat') {
      status[packageName].increment = Math.max(status[packageName].increment, 2)
      toPush = commit
    }
    if (isCommitBreakingChange(commit)) {
      status[packageName].increment = Math.max(status[packageName].increment, 3)
      toPush = commit
    }
    if (toPush) {
      status[packageName].commits.push(commit)
    }
    if (commit.type === 'release') {
      status[packageName].increment = 0
      status[packageName].commits = []
    }
  }

  console.log(status)
  return status
}

export function latestTag () {
  return new Promise((resolve, reject) => {
    gitLatestTag((err, tag) => {
      if (err) reject(err)
      else resolve(tag)
    })
  })
}

export function rawCommits (tag) {
  return new Promise((resolve, reject) => {
    gitRawCommits({ format: '%B%n-hash-%n%H', from: tag })
      .pipe(commitsParser())
      .pipe(concat(function (data) {
        console.log(data)
        const commits = commitsFilter(data)
        if (!commits || !commits.length) {
          reject(null)
        } else {
          resolve(commits)
        }
      }))
  })
}

function showReportHeaderPositive () {
  clear()
  console.log(separator())
  log('RELEASES TO DO\n\n' +
      '    We checked all packages and recent commits, and discovered that\n' +
      '    according to semver.org you should release new versions for the\n' +
      '    following packages.\n')
}

function showReportHeaderNegative () {
  clear()
  console.log(separator())
  log('Nothing to release.\n\n' +
      '    We checked all packages and recent commits, and discovered that\n' +
      '    you do not need to release any new version, according to semver.org.')
}
