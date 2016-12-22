import { EOL } from 'os';
import { Command, Alias, CommandFlags } from 'reginn';
import { green, white, underline, bold } from 'typed-colors';
import { union } from 'ramda';

export function display (command: Command) {
  return `${command.aliases.map(displayAlias)}` +
    `${command.description ? '  -  ' + bold(command.description) + EOL : ''}` +
    `${EOL + EOL}${displayFlags(command.flags)}` + EOL + EOL;
}

function displayAlias (alias: Alias) {
  return green(alias.name === alias.abbreviation
    ? `${underline(alias.name)}`
    : `${underline(alias.name)} ${white('-' + alias.abbreviation)}`);
}

export function displayFlags(flags: CommandFlags) {
  const aliases = flags.alias || {};

  const _strings = flags.string && Array.isArray(flags.string)
    ? flags.string
    : [flags.string as any as string];

  /* tslint:disable max-line-length */
  const strings = union(_strings, []).filter(Boolean)
    .map(x => `--${x}${aliases && aliases[x] ? '-' + aliases[x] : ''}` +
      `${(flags as any).description && (flags as any).description[x] ? '  :  ' + (flags as any).description[x] : ''}` + EOL);

  const booleanFlags = flags.boolean
    ? typeof flags.boolean === 'string' ? [flags.boolean] : flags.boolean
    : [``];

  const booleans = union(booleanFlags, []).filter(Boolean)
    .map(x => `--${x}${aliases && aliases[x] ? ' -' + aliases[x] : ''}` +
      `${(flags as any).description && (flags as any).description[x] ? '  :  ' + (flags as any).description[x] : ''}`);
  /* tslint:enable max-line-length */

  return strings.join() + booleans.join(EOL);
}
