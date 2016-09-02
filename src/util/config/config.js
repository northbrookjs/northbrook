import { dirname, join } from 'path'
import { createWriteStream, readFileSync } from 'fs'
import findConfig from 'find-config'
import jsonbeautify from 'json-beautify'

import { isFile } from '../fs'
import { pluck } from '../object'

// constants
const CONFIG = 'northbrook.json'

const beautify = obj => jsonbeautify(obj, null, 2, 80)

/**
 * gets a northbrook.json configuration file
 * [options an options object for find-config]
 * @type {Object} contains 'path', 'directory', 'config' properties
 */
export function getConfig (file, options = { home: false, json: true }) {
  const json = options && options.json || true
  const path = findConfig(file || CONFIG, options)

  if (!isFile(path)) {
    return { path: null, directory: null, config: null }
  }

  const directory = dirname(path)

  const config = json
    ? Object.assign({}, JSON.parse(readFileSync(path)))
    : readFileSync(path)

  return { path, directory, config }
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

/**
 * Allows making adjustments to a configuration file
 */
export function modifyConfig (configFile, callback) {
  return new Promise((resolve, reject) => {
    if (typeof configFile === 'function') {
      callback = configFile
      configFile = CONFIG
    }

    const { directory, config } = getConfig(configFile)

    const configPath = join(directory, configFile)

    const newConfig = callback(config)

    if (!newConfig && typeof newConfig !== 'object') {
      throw new Error('Callback did not return a new JSON object')
    }

    const fileStream = createWriteStream(configPath)

    fileStream.write(beautify(newConfig))
    fileStream.write('\n')

    fileStream.on('err', (err) => {
      reject(err)
    })

    fileStream.on('end', () => {
      resolve(newConfig)
    })

    fileStream.end()
  })
}

/**
 * shortcut to adding a plugin to a northbrook.json
 */
export function addPlugin (pluginName) {
  return modifyConfig(CONFIG, function (config) {
    if (!config) {
      return console.log('Cannot find a ' + CONFIG + ' to append to')
    }

    if (!pluginName) {
      return config
    }

    if (!Array.isArray(config.plugins)) config.plugins = []

    const plugins = config.plugins

    if (plugins.indexOf(pluginName) > -1) return config

    return Object.assign({}, config, {
      plugins: [...plugins, pluginName]
    })
  })
}

/**
 * shortcut to adding a package to a northbrook.json
 */
export function addPackage (relativePathToPackage) {
  return modifyConfig(CONFIG, function (config) {
    if (!config) {
      return console.log('Cannot find a ' + CONFIG + ' to append to')
    }

    if (!relativePathToPackage) return config

    if (!Array.isArray(config.packages)) config.packages = []

    const packages = config.packages

    if (packages.indexOf(relativePathToPackage) > -1) return config

    return Object.assign({}, config, {
      packages: [...packages, relativePathToPackage]
    })
  })
}
