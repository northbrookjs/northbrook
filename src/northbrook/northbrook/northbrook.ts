import { EOL } from 'os';
import { join, delimiter } from 'path';
import { app, Command, App, description, flag, alias, HandlerApp } from 'reginn';
import { prop, clone } from 'ramda';
import { cyan } from 'typed-colors';
import { resolvePlugins } from './resolvePlugins';
import { resolvePackages } from './resolvePackages';
import { northrookRun } from './run';
import { isFile, defaultStdio } from '../../helpers';
import { NorthbrookConfig, STDIO, Stdio, Plugin } from '../../types';

const only =
  flag('string',
    alias('only', 'o'),
    description('Execute plugins in only specific packages'),
  );

const configPath =
  flag('string',
    alias('config', 'c'),
    description('Relative path to your northbrook config'),
  );

const debug =
  flag('boolean',
    alias('debug', 'd'),
    description('Log more information for debugging'),
  );

// for display in help menu
const nb = app(only, configPath, debug);

export function northbrook(
  config: NorthbrookConfig,
  additionalPlugins: Array<Plugin> = [],
  cwd: string = process.cwd(),
  stdio?: STDIO,
  debugMode = false,
) {
  process.chdir(cwd);

  process.env.PATH = join(cwd, 'node_modules/.bin/') + delimiter + process.env.PATH;

  stdio = { ...defaultStdio, ...stdio || {} };

  const plugins: Array<Plugin> =
    resolvePlugins(config.plugins || [], cwd, stdio as Stdio, debugMode)
      .concat(additionalPlugins);

  let packages: Array<string> =
    resolvePackages(config.packages || [], cwd, stdio as Stdio, debugMode);

  if (packages.length === 0)
    packages = isFile(join(cwd, 'package.json')) ? [cwd] : [];

  config.packages = packages;

  const run = northrookRun(clone(config), cwd, stdio as Stdio);

  return {
    plugins: plugins.slice(0),

    packages: packages.slice(0),

    start (argv?: Array<string>): Promise<HandlerApp> {
      argv = argv || process.argv.slice(2);

      if (debugMode) {
        (stdio as Stdio).stdout.write(cyan(`DEBUG`) +
          `: Starting northbrook with args ${argv.join(' ')}` + EOL + EOL);
      }

      return run(argv, app(nb, ...plugins.map<App | Command>(prop('plugin'))));
    },
  };
}
