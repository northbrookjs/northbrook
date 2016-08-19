const shell = require('shelljs')
const fs = require('fs')

exports.logSeparator = logSeparator
exports.exec = exec
exports.isDirectory = isDirectory
exports.isFile = isFile
exports.isSymbolicLink = isSymbolicLink
exports.getRelative = getRelative
exports.clear = clear
exports.isInitialized = isInitialized

function clear () {
  console.log('\x1Bc')
}

function isInitialized (config) {
  if (!config) {
    throw new Error('This directory has not been initialized')
  }
}

function logSeparator (packageName) {
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

  console.log('\n' + '##' + dashes + output + dashes + '##' + '\n')
}

function exec (command, options = { silent: true, async: false }, start) {
  return new Promise((resolve, reject) => {
    if (options.cwd && isDirectory(options.cwd)) {
      shell.cd(options.cwd)
    }
    shell.exec(command, options, function (code, out, err) {
      if (start && typeof start === 'function') {
        start()
      }
      if (code === 0) {
        resolve([out, err])
      } else {
        reject([out, err])
      }
    })
  })
}

function isDirectory (pathname) {
  try {
    return fs.statSync(pathname).isDirectory()
  } catch (e) {
    return false
  }
}

function isFile (pathname) {
  try {
    return fs.statSync(pathname).isFile()
  } catch (e) {
    return false
  }
}

function isSymbolicLink (pathname) {
  try {
    return fs.lstatSync(pathname).isSymbolicLink()
  } catch (e) {
    return false
  }
}

function getRelative (packageName) {
  return packageName.split('/').filter(Boolean).map(() => '..').join('/')
}
