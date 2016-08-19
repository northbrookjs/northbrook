const shell = require('shelljs')
const { join } = require('path')
const { exec, logSeparator } = require('../../util')

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
  console.log('Running tests for', packageName, '...')

  const newVersion = getNewVersion(require(join(packageDir, 'package.json')).version.split('.'), increment)

  return exec('npm test')
    .then(() => console.log('Running npm version', versions[increment] + '...') ||
      exec(`npm version ${versions[increment]} -m 'release(${packageName}): ${newVersion}'`))
    .then(() => console.log('Running npm publish...') || exec('npm publish --access=public'))
    .catch(err => logSeparator() || err)
    .then(() => logSeparator() || shell.cd(workingDir))
}

function getNewVersion ([major, minor, patch], increment) {
  switch (increment) {
    case 1: return `v${major}.${minor}.${parseInt(patch) + 1}`
    case 2: return `v${major}.${parseInt(minor) + 1}.${patch}`
    case 3: return `v${parseInt(major) + 1}.${minor}.${patch}`
    default: return 'releasing new version'
  }
}
