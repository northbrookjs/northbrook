#!/usr/bin/env node

try {
  // try using a local version first
  // use IIFE to keep `var`s for hoisting
  (function () {
    var northbrook = require('northbrook')
    var config = require('northbrook/lib/util').getConfig()

    northbrook.setup({
      config: config.config,
      directory: config.directory,
      defaultPlugins: northbrook.defaultPlugins
    }).start(process.argv)
  })()
} catch (e) {
  (function () {
    var northbrook = require('./lib/api')
    var config = require('./lib/util').getConfig()

    northbrook.setup({
      config: config.config,
      directory: config.directory,
      defaultPlugins: northbrook.defaultPlugins
    }).start(process.argv)
  })()
}
