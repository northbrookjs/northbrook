const conventionalChangelog = require('conventional-changelog')
const addStream = require('add-stream')
const tempfile = require('tempfile')
const fs = require('fs')
const path = require('path')

const { isFile, exec } = require('../../util')

const startCommits = {}

function touchFile (path, cb) {
  if (isFile(path)) cb()

  return exec(`touch ${path}`, { silent: true }, cb)
}

// Update the startCommit for each package, looking for release commits
// for each package.
exports.generateChangelogs = function (packages, rootDir, callback) {
  const config = {
    preset: 'angular',
    append: true,
    transform: function (commit, cb) {
      if (commit.type === 'release') {
        startCommits[commit.scope] = commit.hash
      }
      cb()
    }
  }

  conventionalChangelog(config, {}, { reverse: true })
    .on('end', () => runUpdateChangelogs(packages, rootDir, callback))
    .resume()
}

function fixDefault (rootDir, packages) {
  const rootname = require(path.join(rootDir, 'package.json')).name
  return packages.map(name => rootname === name ? ['.', rootname] : name)
}

function runUpdateChangelogs (packages, rootDir, callback) {
  console.log(startCommits)
  fixDefault(rootDir, packages).forEach(function (packageName) {
    const packageDir = path.join(rootDir, Array.isArray(packageName) ? packageName[0] : packageName)
    const filename = path.join(packageDir, '/CHANGELOG.md')

    const name = Array.isArray(packageName) ? packageName[1] : packageName

    touchFile(filename, function () {
      const changelogOpts = {
        preset: 'angular',
        releaseCount: 0,
        pkg: {
          path: path.join(packageDir, 'package.json')
        },
        transform: function (commit, cb) {
          if (commit.scope === name) {
            cb(null, commit)
          } else {
            cb()
          }
        }
      }

      const gitRawCommitsOpts = {
        from: startCommits[name]
      }

      const readStream = fs.createReadStream(filename)
      const tmp = tempfile()
      conventionalChangelog(changelogOpts, {}, gitRawCommitsOpts)
        .pipe(addStream(readStream))
        .pipe(fs.createWriteStream(tmp))
        .on('finish', function () {
          fs.createReadStream(tmp)
            .pipe(fs.createWriteStream(filename))
            .on('finish', function () {
              callback && callback()
            })
        })
    })
  })
}
