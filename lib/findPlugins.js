const { join, basename } = require('path')
const { readdirSync } = require('fs')
const { isDirectory } = require('./util')

exports.getPluginsInDirectory = getPluginsInDirectory
exports.getNodeModulesPath = getNodeModulesPath
exports.tryRequirePlugin = tryRequirePlugin
exports.getAllInDirectory = getAllInDirectory

function getPluginsInDirectory (directory) {
  const plugins = []

  getAllInDirectory(directory, function (fileOrDirectoryName) {
    const { plugin } = tryRequirePlugin(fileOrDirectoryName)

    if (!plugin) return

    plugins.push(plugin)
  })

  return plugins
}

function tryRequirePlugin (path) {
  try {
    const pkg = require(path)
    if (typeof pkg !== 'object' || typeof pkg.plugin !== 'function') {
      return { plugin: false }
    }
    return pkg
  } catch (e) {
    return { plugin: null }
  }
}

function getAllInDirectory (directory, cb) {
  const files = readdirSync(directory)
  for (let i = 0; i < files.length; ++i) {
    const filename = basename(files[i])
    const file = join(directory, filename)
    cb(file)
  }
}

function getNodeModulesPath (directory) {
  const NODE_MODULES_DIRECTORY = join(directory, 'node_modules')

  if (isDirectory(NODE_MODULES_DIRECTORY)) {
    return NODE_MODULES_DIRECTORY
  } else {
    return false
  }
}
