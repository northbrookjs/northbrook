var join = require('path').join

var fs = require('fs')
var createWriteStream = fs.createWriteStream
var writeFileSync = fs.writeFileSync
var statSync = fs.statSync

var fixpack = require('fixpack')
var exec = require('shelljs').exec
var jsonbeautify = require('json-beautify')

var beautify = function (obj) { return jsonbeautify(obj, null, 2, 80) }

// this works on the assumption that npm 3 will always install this at the
// top-most level of your node_modules
var CWD = join(__dirname, '../../')
var PACKAGE = join(CWD, 'package.json')
var CONFIG = join(CWD, 'northbrook.json')

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

/**
 * tests if an absolute path exists
 */
function exists (pathname) {
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
      configFile = CONFIG
    }

    var newConfig = callback(require(configFile))

    if (!newConfig || typeof newConfig !== 'object') {
      throw new Error('Callback did not return a new JSON object')
    }

    var fileStream = createWriteStream(configFile)

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
