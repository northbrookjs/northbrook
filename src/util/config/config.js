import { dirname, join } from 'path'
import findConfig from 'find-config'

import { isFile } from '../fs'
import { pluck } from '../object'

// constants
const CONFIG = 'northbrook.json'

/**
 * gets a northbrook.json configuration file
 * [options an options object for find-config]
 * @type {Object} contains 'path', 'directory', 'config' properties
 */
export function getConfig (file, options = { home: false }) {
  const path = findConfig(file || CONFIG, options)

  if (!isFile(path)) {
    return { path: null, directory: null, config: null }
  }

  const directory = dirname(path)
  const config = Object.assign({}, require(path))

  return { directory, config }
}

/**
 * A simple helper to throw uniform error if a config does not exist
 */
export function isInitialized (config, commandName) {
  if (!config) {
    throw new Error(`${commandName}: a northbrook.json is required for this command`)
  }
}

export const isConfig = x => x && x.config

/**
 * Trys to require and return a plugin
 */
export function tryRequireExtends (path) {
  try {
    const pkg = require(path)
    return isConfig(pkg) ? pkg : { config: false }
  } catch (e) {
    return { config: null }
  }
}

export function resolveExtends (config, workingDir) {
  function getExtends (extensionName) {
    return tryRequireExtends(extensionName).config || // try normal require
           tryRequireExtends(join(workingDir, extensionName)).config || // try relative require
           tryRequireExtends(join(workingDir, 'node_modules', extensionName)).config || // try manual require from node_modules
           false
  }

  if (!config) return {}

  const prefix = 'northbrook-'
  const scopePrefix = '@northbrook/'

  const extension = pluck('extends', config)

  return extension &&
        getExtends(extension) ||
        getExtends(prefix + extension) ||
        getExtends(scopePrefix + extension) || {}
}
