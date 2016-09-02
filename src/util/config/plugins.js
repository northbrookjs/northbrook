import { join } from 'path'
import { filter, map } from '../array'
import { pluck } from '../object'

/**
 * returns if something is a plugin
 */
export function isPlugin (x) {
  return x && typeof x === 'object' && typeof x.plugin === 'function'
}

/**
 * Trys to require and return a plugin
 */
export function tryRequirePlugin (path) {
  try {
    const pkg = require(path)
    return isPlugin(pkg) ? pkg : { plugin: false }
  } catch (e) {
    return { plugin: null }
  }
}

/**
 * filters out plugins that are to be ignored
 */
export function filterDefaultPlugins (config, defaults) {
  return config && config.ignoreDefaults && Array.isArray(config.ignoreDefaults)
    ? filter(defaults, plugin => config.ignoreDefaults.indexOf(plugin.name) === -1)
    : defaults
}

/**
 * returns all plugins as defined in a northbrook.json
 */
export function resolvePlugins (config, workingDir) {
  function getPlugin (pluginName) {
    return tryRequirePlugin(pluginName).plugin || // try normal require
           tryRequirePlugin(join(workingDir, pluginName)).plugin || // try relative require
           tryRequirePlugin(join(workingDir, 'node_modules', pluginName)).plugin || // try manual require from node_modules
           false
  }

  if (!config) return []

  const prefix = name => 'northbrook-' + name
  const scopePrefix = name => '@northbrook/' + name

  const plugins = pluck('plugins', config) && config.plugins.slice() // no mutation of original allowd

  return plugins && filter(
      map(plugins, getPlugin)
        .concat(map(map(plugins, prefix), getPlugin))
        .concat(map(map(plugins, scopePrefix), getPlugin))
      , Boolean
    ) || []
}
