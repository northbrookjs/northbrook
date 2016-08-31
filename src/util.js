// node.js imports
import { join, dirname, relative } from 'path'
import { statSync, lstatSync, readdirSync } from 'fs'
import { start, change_sequence as changeSeq } from 'simple-spinner'

changeSeq(['    ', '.   ', '..  ', '... ', '....', ' ...', '  ..', '   .'])

// third-party imports
import 'colors'
import { cd, exec as cmd } from 'shelljs'
import findConfig from 'find-config'

// constants
const CONFIG = 'northbrook.json'

export const filterScopes = name => name.replace(/@[a-z]+\//g, '')

export function isInitialized (config, commandName) {
  if (!config) {
    throw new Error(`${commandName}: a northbrook.json is required for this command`)
  }
}

/**
 * Splits a semantic version number into an array of 3 parts
 */
export function splitVersion (version) {
  const _version =
    filter(map(filter(version.split('.'),
               x => x !== ''),
          x => x === 'x' || parseInt(x)),
    x => x === 'x' || !Number.isNaN(x))

  if (_version.length !== 3) {
    throw new Error(`${version} passed is not a proper semantic version number`)
  }

  return _version
}

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
 * tests if an absolute path exists
 */
export function exists (pathname) {
  try {
    return statSync(pathname)
  } catch (e) {
    return false
  }
}

/**
 * tests if an absolute path is a directory
 */
export function isDirectory (pathname) {
  const stats = exists(pathname)
  return stats ? stats.isDirectory() : false
}

/**
 * tests if an absolute path is a file
 */
export function isFile (pathname) {
  const stats = exists(pathname)
  return stats ? stats.isFile() : false
}

/**
 * tests if an absolute path is a symbolic link
 */
export function isLink (pathname) {
  try {
    lstatSync(pathname).isSymbolicLink()
  } catch (e) {
    return false
  }
}

/**
 * Gets all files in a directory
 */
export function getAllInDirectory (directory, recursive = false) {
  return reduce(readdirSync(directory), [], (files, file) => {
    const abspath = join(directory, file)

    if (isFile(abspath)) {
      return files.concat(file)
    }

    if (recursive && isDirectory(abspath)) {
      return files.concat(...getAllInDirectory(abspath))
    }

    return files
  })
}

const hasPkg = file => isFile(join(file, 'package.json'))
/**
 * Gets all packages from a config file to accepts wild card syntax
 */
export function resolvePackages (config, workingDir) {
  const toRelative = name => relative(workingDir, name)
  if (config) {
    if (Array.isArray(config.packages)) {
      if (config.packages.length === 0) {
        return ['.']
      }
      return reduce(config.packages, [], (packages, packageName) => {
        if (packageName.endsWith('**')) {
          const packageDir = join(workingDir, packageName.replace('**', ''))
          const files = map(filter(getAllInDirectory(packageDir), hasPkg), toRelative)
          return packages.concat(files)
        }
        return packages.concat(packageName)
      })
    } else {
      return ['.']
    }
  }

  return []
}

/**
 * returns 80 character wide string used to log a separation between
 * outputs
 */
export function separator (packageName) {
  let length = typeof packageName === 'string'
    ? Math.round((76 - packageName.length) / 2)
    : 76 / 2

  if (packageName && packageName.length % 2 !== 0) {
    length = length - 1
  }

  const arr = Array(length)
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = '-'
  }
  const dashes = arr.join('')

  let output = packageName && packageName.length % 2 === 0 && packageName ||
               packageName && packageName + '-' || ''

  return (`\n##` + `${dashes}`.white + `${output}` + `${dashes}`.white + `##\n`)
}

/**
 * clears the console
 */
export function clear () {
  console.log('\x1Bc')
}

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
 * given a path will require that object an
 */
export function pluck (args, obj) {
  function pluckReduce (a, b) {
    if (typeof a === 'string') return b[a]
    return reduce(a, b, (obj, x) => {
      if (!obj || typeof obj !== 'object') {
        return null
      }
      return obj[x]
    })
  }

  // curry this thing
  switch (arguments.length) {
    case 1: return (b) => pluckReduce(args, b)
    case 2: return pluckReduce(args, obj)
    default: return pluckReduce(args, obj)
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

export function resolveExtends (config, workingDir) {
  function getExtends (extensionName) {
    return tryRequirePlugin(extensionName).config || // try normal require
           tryRequirePlugin(join(workingDir, extensionName)).config || // try relative require
           tryRequirePlugin(join(workingDir, 'node_modules', extensionName)).config || // try manual require from node_modules
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
 *  filters all packages to match only a specific package
 */
export function onlyPackage (name, packages) {
  return filter(packages, packagename => packagename === name)
}

export function log (progress, ...args) {
  if (progress) {
    if (typeof progress === 'string') {
      return process.stdout.write(`${[progress].concat(args || []).map(modOutput).join(' ')}\n`, { encoding: 'UTF-8' })
    } else if (progress === true) {
      process.stdout.write(`${args.map(modOutput).join(' ')}`, { encoding: 'UTF-8' })
      start()
    }
    return
  }
  process.stdout.write('\n', { encoding: 'UTF-8' })
}

/**
 *  add 4 spaces to all lines
 */
export function modOutput (output) {
  return output.replace('\n', '\n    ').replace('\r', '\r    ')
}

/**
 *  change the current directory
 */
export function chdir (path) {
  cd(path)
}

/**
 * executes a command asynchronously
 */
export function exec (command, options = { silent: true }) {
  return new Promise((resolve, reject) => {
    cmd(command, options, function (code, out, err) {
      resolve({ cmd: command, code, out, err })
    })
  })
}

// user-land array functions for perf
// tested by testing all of the above functions

export function forEach (arr, fn) {
  const l = arr.length
  for (let i = 0; i < l; ++i) {
    fn(arr[i], i)
  }
}

export function map (arr, fn) {
  const newArr = []
  forEach(arr, (x, i) => { newArr[i] = fn(x, i) })
  return newArr
}

export function reduce (arr, seed, fn) {
  let r = seed

  forEach(arr, (x) => {
    r = fn(r, x)
  })

  return r
}

export function filter (arr, predicate) {
  const newArr = []

  forEach(arr, (x, i) => {
    if (predicate(x, i)) {
      newArr[newArr.length] = x
    }
  })

  return newArr
}
