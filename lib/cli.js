#!/usr/bin/env node
'use strict'

const program = require('commander')
const findConfig = require('find-config')
const { dirname, join } = require('path')
const { cd } = require('shelljs')
const { getPluginsInDirectory, getNodeModulesPath, tryRequirePlugin } = require('./findPlugins')
const { isDirectory } = require('./util')

const defaultPlugins = getPluginsInDirectory(join(__dirname, 'subcommand'))

exports.setup = setup

function setup () {
  // get northbrook version
  const version = require('../package.json').version

  // find location of configuration file
  const northbrook = findConfig('northbrook.json', { home: false })

  // find and switch to plugins should be working from
  const workingDir = northbrook !== null ? dirname(northbrook) : process.cwd()
  cd(workingDir)

  // require this config file if possible
  // should only be impossible for `init`
  const config = northbrook !== null ? Object.assign({}, require(northbrook)) : null

  // setup overall command line stuff
  program.version(version)

  let plugins = []

  // if a config file exists and the ignoreDefaults options is present
  // check to see if a default plugin should be ignored
  // useful if an external plugin uses the same command name
  if (config && Array.isArray(config.ignoreDefaults)) {
    defaultPlugins.forEach(function (plugin) {
      if (config.ignoreDefaults.indexOf(plugin.name) === -1) {
        plugins.push(plugin)
      }
    })
  } else {
    plugins.push(...defaultPlugins)
  }

  const NODE_MODULES_DIRECTORY = getNodeModulesPath(workingDir)

  // if there are plugins configured to be loaded load them
  if (config && Array.isArray(config.plugins) && isDirectory(NODE_MODULES_DIRECTORY)) {
    config.plugins.forEach(function (pluginName) {
      const { plugin } = tryRequirePlugin(
        pluginName.startsWith('./')
          ? join(workingDir, pluginName)
          : pluginName
      )

      if (!plugin) return

      plugins.push(plugin)
    })
  }

  // initiaize all plugins
  plugins.forEach(function (plugin) {
    plugin(program, config, workingDir)
  })

  // start program
  program.parse(process.argv)
}

try {
  // prefer using a local version if possible
  require(join(process.cwd(), 'node_modules/northbrook/lib/cli')).setup()
} catch (e) {
  setup()
}
