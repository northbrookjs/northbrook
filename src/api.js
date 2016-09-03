import commander from 'commander'
import {
  resolvePlugins,
  resolvePackages,
  resolveExtends,
  filterDefaultPlugins,
  forEach,
  chdir
} from './util'

// many functions are useful to plugins expose them directly
export * from './util'

import { plugin as exec } from './plugin/exec'
import { plugin as link } from './plugin/link'
import { plugin as commit } from './plugin/commit'
import { plugin as release } from './plugin/release'
import { plugin as scripts } from './plugin/run'

export const defaultPlugins = [ commit, release, exec, link, scripts ]

const clone = (...obj) => Object.assign({}, ...obj)

/**
 * Utility function to create a basic plugin
 */
export function basicPlugin (command, description, action, only = false) {
  return function plugin (program, config, directory) {
    if (only) {
      program.command(command)
      .option('-o, --only <packageName>', 'Run a command in a single package')
      .description(description)
      .action((...args) => action(config, directory, ...args))
    } else {
      program.command(command)
      .description(description)
      .action((...args) => action(config, directory, ...args))
    }
  }
}

/**
 * Programmatically run the application
 */
export function setup ({ config, directory, defaultPlugins = [] }) {
  const version = require('../package.json').version

  if (directory) { chdir(directory) }

  const packages = resolvePackages(config, directory)
  if (config) {
    config.packages = packages
  }

  const configExtends = resolveExtends(config, directory)

  const defaults = filterDefaultPlugins(config, defaultPlugins)
  const userPlugins = resolvePlugins(config, directory)

  const plugins = defaults.concat(userPlugins)

  const program = commander.version(version)

  forEach(plugins, plugin => plugin(program, clone(configExtends, config), directory))

  process.on('beforeExit', () => {
    process.stdout.write('\n', { encoding: 'utf8' })
  })

  return {
    plugins,
    packages,
    version,
    start (args) {
      program.parse(args)
    }
  }
}
