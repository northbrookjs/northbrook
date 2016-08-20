const shell = require('shelljs')
const { join } = require('path')
const { logSeparator } = require('../../util')

const versions = {
  1: 'patch',
  2: 'minor',
  3: 'major'
}

exports.performRelease = performRelease

function fixDefault (rootDir, name) {
  const rootname = require(join(rootDir, 'package.json')).name
  return rootname === name ? '.' : name
}

function performRelease (workingDir, packageName, increment) {
  const packageDir = join(workingDir, fixDefault(workingDir, packageName))
  shell.cd(packageDir)
  logSeparator(packageName)

  const pkg = require(join(packageDir, 'package.json'))

  if (pkg && pkg.private) {
    console.log('    This package is private. Skipping...')
    return logSeparator()
  }

  const newVersion = getNewVersion(pkg.version.split('.'), increment)

  console.log('Running your tests...')
  shell.exec('npm test', {silent: true}, function (code, out, err) {
    if (code === 0) {
      shell.exec(`npm version ${versions[increment]} -m 'release(${packageName}): ${newVersion}'`, {silent: true}, function (code, out, err) {
        if (code === 0) {
          shell.exec('npm publish --access=public', {silent: true}, function (code, out, err) {
            if (code === 0) {
              console.log('Publishing has been successful\n    ', out)
              shell.cd(workingDir)
              logSeparator()
              return packageName
            } else {
              console.log('Publishing has been unsucceful\n    ', err)
              logSeparator()
              return null
            }
          })
        } else {
          console.log('Versioning has failed\n    ', err)
          logSeparator()
          return null
        }
      })
    } else {
      console.log(`Tests for ${packageName} have failed\n    `, err)
      logSeparator()
      return null
    }
  })
}

function getNewVersion ([major, minor, patch], increment) {
  switch (increment) {
    case 1: return `v${major}.${minor}.${parseInt(patch) + 1}`
    case 2: return `v${major}.${parseInt(minor) + 1}.${patch}`
    case 3: return `v${parseInt(major) + 1}.${minor}.${patch}`
    default: return 'releasing new version'
  }
}
