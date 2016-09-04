var path = require('path')
var join = path.join
var dirname = path.dirname

var fs = require('fs')
var createWriteStream = fs.createWriteStream
var writeFileSync = fs.writeFileSync
var readFileSync = fs.readFileSync
var statSync = fs.statSync

var findConfig = require('find-config')
var fixpack = require('fixpack')
var exec = require('shelljs').exec
var jsonbeautify = require('json-beautify')

var beautify = function (obj) { return jsonbeautify(obj, null, 2, 80) }

var PACKAGE = join(process.cwd(), 'package.json')
var CONFIG = join(process.cwd(), 'northbrook.json')

var config = {
  ghooks: {
    'commit-msg': 'node ./node_modules/.bin/validate-commit-msg'
  },
  'validate-commit-msg': {
    types: '@northbrook/commit-types'
  }
}

var scripts = {
  commit: 'northbrook commit',
  release: 'northbrook release'
}

var defaultConfig = {
  plugins: [],
  scripts: {}
}

function getConfig (file, options = { home: false, json: true }) {
  var json = options && options.json || true
  var path = findConfig(file || CONFIG, options)

  if (!isFile(path)) {
    return { path: null, directory: null, config: null }
  }

  var directory = dirname(path)

  var config = json
    ? Object.assign({}, JSON.parse(readFileSync(path)))
    : readFileSync(path)

  return { path: path, directory: directory, config: config }
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
 * tests if an absolute path is a file
 */
function isFile (pathname) {
  var stats = exists(pathname)
  return stats ? stats.isFile() : false
}

/**
 * Allows making adjustments to a configuration file
 */
function modifyConfig (configFile, callback) {
  return new Promise(function (resolve, reject) {
    if (typeof configFile === 'function') {
      callback = configFile
      configFile = 'northbrook.json'
    }

    var _config = getConfig(configFile)

    var config = _config.config
    var configPath = _config.path

    var newConfig = callback(config)

    if (!newConfig && typeof newConfig !== 'object') {
      throw new Error('Callback did not return a new JSON object')
    }

    var fileStream = createWriteStream(configPath)

    fileStream.write(beautify(newConfig))
    fileStream.write('\n')

    fileStream.on('err', function (err) {
      reject(err)
    })

    fileStream.on('end', function () {
      resolve(newConfig)
    })

    fileStream.end()
  })
}

if (!process.env.CONTINUOUS_INTEGRATION) {
  modifyConfig(PACKAGE, function (pkg) {
    if (!pkg) { throw new Error('package.json can not be found!') }

    var existingConfig = pkg.config || {}
    var existingScripts = pkg.scripts || {}

    return Object.assign({}, pkg, {
      config: Object.assign({}, existingConfig, config),
      scripts: Object.assign({}, existingScripts, scripts)
    })
  })
  .then(function () {
    fixpack(PACKAGE)
  })

  if (!isFile(CONFIG)) {
    exec(`touch ${CONFIG}`, { silent: true, cwd: process.cwd() }, function (code, out, err) {
      if (code === 0) {
        writeFileSync(CONFIG, beautify(defaultConfig))
      } else {
        throw new Error('Could not create northbrook.json')
      }
    })
  }
}
