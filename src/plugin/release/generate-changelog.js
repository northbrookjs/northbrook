import { createWriteStream } from 'fs'
import { forEach, isFile, exec } from '../../util'

export function generateChangelog ({ commits, file, version, url, bugs, previousFile }) {
  const changelog = typeof file === 'string' ? createFileStream(file) : file
  return new Promise((resolve) => {
    const sections = {
      breaks: [], // special section to highlight breaking changes
      feat: [],
      fix: [],
      perf: []
    }

    const titles = {
      breaks: 'Breaking Changes',
      feat: 'Features',
      fix: 'Bug Fixes',
      perf: 'Performance Improvements'
    }

    changelog.write(`# ${version} (${currentDate()})\n---\n\n`)

    forEach(commits, function (commit) {
      if (isCommitBreakingChange(commit)) {
        sections.breaks.push(commit)
      } else {
        sections[commit.type] = sections[commit.type] || []
        sections[commit.type].push(commit)
      }
    })

    forEach(Object.keys(sections), function (section) {
      const sectionCommits = sections[section]
      const title = titles[section]

      if (!sectionCommits.length) return

      changelog.write(`\n## ${title}\n\n`)

      forEach(sectionCommits, function (commit) {
        changelog.write(`    - ${commit.header} ${linkToCommit(commit.hash, url)}`)
        changelog.write(`\n`)
      })
    })

    changelog.write('\n\n')
    changelog.write(previousFile)

    changelog.on('finish', () => {
      resolve(changelog)
    })

    changelog.end()
  })
}

function createFileStream (file) {
  if (!isFile(file)) {
    exec(`touch ${file}`, { silent: true, async: false })
  }
  return createWriteStream(file)
}

function linkToCommit (hash, url) {
  return `[${hash.substr(0, 8)}](${url}/commits/${hash}\)`
}

function currentDate () {
  const now = new Date()
  const pad = function (i) {
    return ('0' + i).substr(-2)
  }
  return `${now.getFullYear()}-` +
         `${pad(now.getMonth() + 1)}-` +
         `${pad(now.getDate())}`
}

function isCommitBreakingChange (commit) {
  return (typeof commit.footer === 'string' &&
    commit.footer.indexOf('BREAKING CHANGE') !== -1)
}
