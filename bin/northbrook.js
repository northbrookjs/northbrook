#!/usr/bin/env node

var EOL = require('os').EOL;
var join = require('path').join;
var dirname = require('path').dirname;
var isAbsolute = require('path').isAbsolute;
var fs = require('fs');

var defaultPlugins = require('../plugins');

(function (northbrook, argv) {
  var config;
  var path;
  var nbConfig;

  var index = argv.indexOf('--config');

  try {
    require('ts-node/register');
  } catch (e) {}

  try {
    require('buba/register');
  } catch (e) {}

  if (index === -1)
    index = argv.indexOf('-c');

  if (index >= 0) {
    var path = argv[index + 1];

    var configPath = isAbsolute(path)
      ? path
      : join(process.cwd(), argv[index + 1]);

    config = { path: process.cwd(), config: require(configPath) };
  } else {
    config = northbrook.findNorthbrookConfig();
  }

  var path = config.path;
  var nbConfig = config.config;

  if (!path || !nbConfig) {
    path = process.cwd();

    nbConfig = { };
  }

  var additionalPlugins = !nbConfig.plugins
    ? findAdditionalPlugins(path)
    : [];

  var debug = argv.indexOf('--debug') > -1 || argv.indexOf('-d') > -1;

  var start = northbrook.northbrook(nbConfig, additionalPlugins, path, {}, debug).start;

  start(argv);
})(require('../northbrook'), process.argv.slice(2));

function findAdditionalPlugins(path) {
  var additionalPlugins = scopedPlugins(path).concat(prefixedPlugins(path))

  return [ defaultPlugins ]
    .concat(additionalPlugins)
    .filter(plugin => !!plugin.plugin);
}

function scopedPlugins(path) {
  try {
    return fs.readdirSync(join(path, 'node_modules/@northbrook'))
     .map(plugin => require(join(path, 'node_modules/@northbrook', plugin)))
  } catch (e) {
    return [];
  }
}

function prefixedPlugins(path) {
  try {
    return fs.readdirSync(join(path, 'node_modules'))
      .filter(folder => folder.startsWith('northbrook-'))
      .map(plugin => require(join(path, 'node_modules', plugin)));
  } catch (e) {
    return [];
  }
}
