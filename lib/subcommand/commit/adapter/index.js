const findConfig = require('find-config')
const conventionalCommitTypes = require('conventional-commit-types')
const { join, dirname } = require('path')

const engine = require('./engine')

module.exports = engine({
  types: conventionalCommitTypes.types,
  scopes: getScopes()
})

function packageToScopeName (packageName, workingDir) {
  const scope = require(join(workingDir, packageName, 'package.json')).name
  return { name: scope, value: packageName === '.' ? scope : packageName }
}

function getScopes () {
  const config = findConfig('northbrook.json', { home: false })
  const packages = require(config).packages
  return packages.map(name => packageToScopeName(name, dirname(config)))
}
