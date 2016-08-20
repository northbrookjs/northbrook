#!/usr/bin/env node
'use strict'

const program = require('commander')
const findConfig = require('find-config')
const { dirname, join, relative } = require('path')
const { cd } = require('shelljs')
const { tryRequirePlugin, getAllInDirectory } = require('./findPlugins')
const { isDirectory, isFile } = require('./util')

const { plugin: commit } = require('./subcommand/commit')
const { plugin: exec } = require('./subcommand/exec')
const { plugin: init } = require('./subcommand/init')
const { plugin: link } = require('./subcommand/link')
const { plugin: release } = require('./subcommand/release')

const defaults = [ commit, exec, init, link, release ]

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

  config.packages = resolvePackages(config.packages, workingDir)

  // setup overall command line stuff
  program.version(version)

  // if a config file exists and the ignoreDefaults options is present
  // check to see if a default plugin should be ignored
  // useful if an external plugin uses the same command name
  const defaultPlugins = config && Array.isArray(config.ignoreDefaults)
    ? defaults.filter(plugin => config.ignoreDefaults.indexOf(plugin.name) > -1)
    : defaults

  const plugins = config && Array.isArray(config.plugins)
    ? defaultPlugins.concat(config.plugins.slice().map(getPlugin(workingDir))).filter(Boolean)
    : defaultPlugins

  // initialize all plugins
  plugins.forEach(function (plugin) {
    plugin(program, Object.assign({}, config), workingDir)
  })

  // start program
  program.parse(process.argv)
}

function getPlugin (workingDir) {
  return function (pluginName) {
    const { plugin } = tryRequirePlugin(pluginName.startsWith('./') || pluginName.startsWith('../')
      ? join(workingDir, pluginName)
      : join(workingDir, 'node_modules', pluginName)
    )

    if (plugin) return plugin

    return tryRequirePlugin(join(workingDir, 'node_modules', `northbrook-${pluginName}`)).plugin
  }
}

function resolvePackages (_packages, workingDir) {
  let packages = []
  _packages.forEach(function (packageName) {
    if (packageName.indexOf('**') > -1) {
      const packageDir = join(workingDir, packageName.replace('**', ''))
      getAllInDirectory(packageDir, function (name) {
        if (isDirectoryWithPkg(name)) {
          packages.push(relative(workingDir, name))
        }
      })
    } else {
      packages.push(packageName)
    }
  })
  return packages
}

const isDirectoryWithPkg = dir => isDirectory(dir) && isFile(join(dir, 'package.json'))

try {
  require(join(process.cwd(), 'node_modules/northbrook/lib/cli.js')).setup()
} catch (e) {
  setup()
}
