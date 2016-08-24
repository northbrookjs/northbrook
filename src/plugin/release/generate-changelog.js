import { forEach } from '../../util'

export function generateChangelog ({ commits, file, version, url, bugs, previousFile }) {
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

    file.write(`# ${version} (${currentDate()})\n---\n\n`)

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

      file.write(`\n## ${title}\n\n`)

      forEach(sectionCommits, function (commit) {
        file.write(`    - ${commit.header} ${linkToCommit(commit.hash, url)}`)
        file.write(`\n`)
      })
    })

    file.write(previousFile)

    resolve(file)
  })
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
