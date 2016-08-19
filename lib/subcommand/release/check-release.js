const conventionalChangelog = require('conventional-changelog')

function incrementName (code) {
  if (code === 1) {
    return 'patch'
  } else if (code === 2) {
    return 'minor'
  } else if (code === 3) {
    return 'major'
  } else {
    return ''
  }
}

function isCommitBreakingChange (commit) {
  return (typeof commit.footer === 'string' &&
    commit.footer.indexOf('BREAKING CHANGE') !== -1)
}

function showReportHeaderPositive () {
  console.log('RELEASES TO DO\n\n' +
              'We checked all packages and recent commits, and discovered that\n' +
              'according to semver.org you should release new versions for the\n' +
              'following packages.\n')
}

function showReportHeaderNegative () {
  console.log('Nothing to release.\n\n' +
              'We checked all packages and recent commits, and discovered that\n' +
              'you do not need to release any new version, according to semver.org.')
}

function showReport (status, callback) {
  let headerShown = false
  for (const packageName in status) {
    if (status.hasOwnProperty(packageName) && status[packageName].increment > 0) {
      if (!headerShown) {
        showReportHeaderPositive()
        headerShown = true
      }

      console.log('`' + packageName + '` needs a new ' +
        incrementName(status[packageName].increment).toUpperCase() +
        ' version released because:')
      status[packageName].commits.forEach(function (commit) {
        console.log('  . ' + commit.header)
        if (isCommitBreakingChange(commit)) {
          console.log('    BREAKING CHANGE')
        }
      })
      console.log('')
    }
  }
  if (!headerShown) {
    showReportHeaderNegative()
    callback(false)
  }
  callback(status)
}

exports.checkRelease = function checkRelease (packages, callback) {
  const status = {}

  packages.forEach(function (packageName) {
    status[packageName] = {
      increment: 0, // 0 = nothing, 1 = patch, 2 = minor, 3 = major
      commits: []
    }
  })

  const config = {
    preset: 'angular',
    append: true,
    transform: function (commit, cb) {
      if (packages.indexOf(commit.scope) === -1) {
        cb()
        return
      }

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
      cb()
    }
  }

  conventionalChangelog(config, {}, { reverse: true })
    .on('end', function () {
      showReport(status, callback)
    })
    .resume()
}
