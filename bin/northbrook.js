#!/usr/bin/env node

var EOL = require('os').EOL;
var join = require('path').join;
var dirname = require('path').dirname;
var isAbsolute = require('path').isAbsolute;

var defaultPlugins = join(__dirname, '../plugins');

(function (northbrook, argv) {
  var config;
  var path;
  var nbConfig;

  var index = argv.indexOf('--config');

  if (index === -1)
    index = argv.indexOf('-c');

  if (index >= 0) {
    var path = argv[index + 1];

    var configPath = isAbsolute(path)
      ? path
      : join(process.cwd(), argv[index + 1]);

    if (configPath.endsWith('.ts'))
      require('ts-node/register');

    config = { path: process.cwd(), config: require(configPath) };
  } else {
    config = northbrook.findNorthbrookConfig();
  }

  var path = config.path;
  var nbConfig = config.config;

  if (!path || !nbConfig) {
    path = process.cwd();

    nbConfig = {
      packages: ['.'],
      plugins: [defaultPlugins]
    };
  }

  var debug = argv.indexOf('--debug') > -1 || argv.indexOf('-d') > -1;

  var start = northbrook.northbrook(nbConfig, [], path, {}, debug).start;

  start(argv);
})(require('../northbrook'), process.argv.slice(2));
