#!/usr/bin/env node

try {
  // try using a local version first
  // use IIFE to keep `var`s from hoisting
  (function () {
    var northbrook = require('northbrook')
    var config = northbrook.getConfig()

    northbrook.setup({
      config: config.config,
      directory: config.directory,
      defaultPlugins: northbrook.defaultPlugins
    }).start(process.argv)
  })()
} catch (e) {
  (function () {
    var northbrook = require('./lib/api')
    var config = northbrook.getConfig()

    northbrook.setup({
      config: config.config,
      directory: config.directory,
      defaultPlugins: northbrook.defaultPlugins
    }).start(process.argv)
  })()
}
