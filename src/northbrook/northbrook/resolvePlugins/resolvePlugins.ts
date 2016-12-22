import { EOL } from 'os';
import { join } from 'path';
import { App, Command } from 'reginn';
import { filter, flatten, map } from 'ramda';
import { cyan, yellow } from 'typed-colors';
import { Plugin, Stdio } from '../../../types';
import { tryRequire } from './tryRequire';

// finds all require()-able plugins
export function resolvePlugins(
  plugins: Array<string | App | Command>,
  cwd: string = process.cwd(),
  stdio: Stdio,
  debug = false): Array<Plugin>
{
  require('ts-node/register'); // allow writing local plugins in TypeScript
  return filter(Boolean, flatten(map(resolvePlugin(cwd, stdio, debug), plugins)));
}

const NORTHBROOK_PREFIXES = ['', '@northbrook/', 'northbrook-'];

function resolvePlugin(cwd: string, stdio: Stdio, debug: boolean) {
  return function (pluginName: string | App | Command) {
    if (isCommandOrApp(pluginName)) return pluginName;

    let plugin = tryRequire(join(cwd, pluginName));

    if (isPlugin(plugin)) return plugin;

    for (let i = 0; i < NORTHBROOK_PREFIXES.length; ++i) {
      plugin = tryRequire(NORTHBROOK_PREFIXES[i] + pluginName);

      if (isPlugin(plugin)) {
        if (debug)
          stdio.stdout.write(cyan('DEBUG') + `: Resolved plugin ${pluginName}` + EOL);

        return plugin;
      }
    }

    stdio.stdout.write(yellow(`WARNING`) + `: Could not resolve plugin: ${pluginName}` + EOL);

    return null;
  };
}

function isPlugin(plugin: any): boolean {
  if (!plugin || !plugin.plugin) return false;

  return isCommandOrApp(plugin.plugin);
}

function isCommandOrApp(x: any) {
  if (x.type === 'command' || x.type === 'app') return true;

  return false;
}
