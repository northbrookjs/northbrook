import { Command, CommandFlags, HandlerApp } from 'reginn';
import { getCommandFlags } from 'reginn/lib/commonjs/run/getCommandFlags';
import { tail } from 'ramda';
import { deepMerge } from '../../../helpers';
import { NorthbrookConfig, Stdio } from '../../../types';

export function callCommand(
  argv: string[],
  parsedArgs: string[],
  flags: CommandFlags,
  filter: (command: Command) => CommandFlags,
  config: NorthbrookConfig,
  directory: string,
  stdio: Stdio,
) {
  return function (command: Command) {
    if (!command.handler) return;

    if (command.commands.length > 0) {
      const commandFlags = deepMerge(flags, getCommandFlags(command.commands as any));
      command.handler(
        createSubApplication(
          argv,
          parsedArgs,
          commandFlags,
          command,
          filter,
          config,
          directory,
        ),
        stdio,
      );
    } else if (command.aliases && command.aliases.length > 0) {
      command.handler({
        config,
        directory,
        args: tail(parsedArgs),
        options: optionsToCamelCase(filter(command)),
      }, stdio);
    } else {
      command.handler({
        config,
        directory,
        args: parsedArgs,
        options: optionsToCamelCase(filter(command)),
      }, stdio);
    }
  };
}

function optionsToCamelCase(options: any) {
  return Object.keys(options).reduce((acc: any, key: string) => {
    const value = options[key];

    acc[toCamelCase(key)] = value;

    return acc;
  }, {});
}

function toCamelCase(str: string): string {
  return str.replace(/-\w/, (x) => x[1].toUpperCase());
}

function createSubApplication(
  argv: string[],
  parsedArgs: string[],
  commandFlags: CommandFlags, command: Command,
  filter: (command: Command) => CommandFlags,
  config: NorthbrookConfig,
  directory: string): HandlerApp
{
  const flags = argv.filter(arg => parsedArgs.indexOf(arg) === -1);
  const args = tail(parsedArgs).concat(flags);

  return {
    type: 'app',
    args,
    options: optionsToCamelCase(filter(command)),
    commands: command.commands,
    flags: commandFlags,
    config,
    directory,
  };
}
