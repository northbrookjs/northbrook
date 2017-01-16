import { App, Command, HandlerApp } from 'reginn';
import { NorthbrookConfig, Stdio } from '../../../types';
import { bold, green, red, white, yellow } from 'typed-colors';
import { display, displayFlags } from './display';
import { forEach, ifElse } from 'ramda';
// avoid reimplementing everything
import { parseArguments, splitArguments } from 'reginn/lib/commonjs/run/parseArguments';

import { EOL } from 'os';
import { DepGraph } from '../buildDependencyGraph';
import { callCommand } from './callCommand';
import { cross } from 'typed-figures';
import { deepMerge } from '../../../helpers';
import { filterOptions } from 'reginn/lib/commonjs/run/filterOptions';
import { getCommandFlags } from 'reginn/lib/commonjs/run/getCommandFlags';
import { matchCommands } from 'reginn/lib/commonjs/run/matchCommands';

export function northrookRun(
  config: NorthbrookConfig,
  depGraph: DepGraph,
  directory: string,
  stdio: Stdio)
{
  return function run(
    argv: Array<string>, app: App): Promise<HandlerApp>
  {
    const { stdout } = stdio;

    const parsedArguments: any = parseArguments(argv, app.flags);

    // show help if no arguments are passed in
    if (argv.length === 0) {
      stdout.write(bold(`No commands were expressed...` + EOL + EOL));
      parsedArguments.help = true;
    }

    const matchedCommands = matchCommands(app as any, parsedArguments);

    // fail early if no commands have been matched
    if (matchedCommands.length === 0 && !(parsedArguments as any).help) {
      throw new Error(red(bold(cross)) + ' ' +
        white('Can not find command ') +
        (parsedArguments._[0] ? red(bold(`${parsedArguments._[0]}`)) : ''));
    }

    return execute(argv, app, config, depGraph, directory, stdio, matchedCommands, parsedArguments);
  };
}

function execute(
  argv: string[],
  app: App,
  config: NorthbrookConfig,
  depGraph: DepGraph,
  directory: string,
  stdio: Stdio,
  matchedCommands: Array<Command>,
  parsedArguments: any,
): Promise<HandlerApp>
{
  const { stdout = process.stdout } = stdio;

  const commandFlags = deepMerge(app.flags, getCommandFlags(matchedCommands as any));
  const [args, options] = splitArguments(parseArguments(argv, commandFlags));

  const filterCommandOptions = filterOptions(options, app.flags, argv);
  const commandCall =
    callCommand(argv, args, commandFlags, filterCommandOptions, config, directory, stdio, depGraph);

  if ((parsedArguments as any).help === true) {
    stdout.write(green(bold(`Northbrook`)) + EOL + EOL +
      `${displayFlags(app.flags).replace(/,--/, '--')}` + EOL + EOL +
      `${app.commands.map(display)}`
        .replace(new RegExp(`${EOL},`, 'g'), EOL)
        .replace(new RegExp(`[${EOL}]{3,}`, 'g'), EOL + EOL)
        .trim() + EOL + EOL);
  } else {
    // call all matched commands
    forEach(ifElse(hasHandlerFn, commandCall, logWarning(stdout)), matchedCommands);
  }

  return Promise.resolve<HandlerApp>({
    config,
    depGraph,
    directory,
    type: 'app',
    flags: commandFlags,
    commands: matchedCommands,
    args,
    options,
  });
}

function hasHandlerFn (command: Command) {
  return isFunction(command.handler);
}

function isFunction (x: any): boolean {
  return !!(x && x.constructor && x.call && x.apply);
}

function logWarning (stdout: NodeJS.WritableStream) {
  return function (command: Command) {
    const aliases = command.aliases;
    if (aliases.length > 0) {
      const name = aliases[0].name;
      stdout.write(yellow(`${name}`) + white(` does not have an associated handler!` + EOL));
    }
  };
}
