import { EOL } from 'os';
import { dirname } from 'path';
import { yellow, bold } from 'typed-colors';
import findup = require('findup-sync');

import { STDIO, NorthbrookConfig } from '../../types';

const NORTHBROOK_CONFIG =
  ['northbrook.ts', 'northbrook.js'];

export type PathConfig =
  { path: null, config: null } |
  { path: string, config: NorthbrookConfig };

/**
 * Find the path of a northbrook.js file and require it.
 *
 * @export
 * @param {STDIO} [stdio]
 * @returns {({ path: string, config: NorthbrookConfig } | null)}
 */
export function findNorthbrookConfig(
  stdio: STDIO = {}, options?: { cwd?: string, case?: boolean }): PathConfig
{
  const { stdout = process.stdout } = stdio;

  const northbrookFilePath: string = findup(NORTHBROOK_CONFIG, options);

  if (!northbrookFilePath) {
    stdout.write(yellow(bold(`WARNING`)) + `: `
      + bold(`Failed to find a Northbrook configuration file`)
      + EOL,
    );

    return { path: null, config: null };
  }

  const config: NorthbrookConfig = require(northbrookFilePath);

  const path: string = dirname(northbrookFilePath);

  return { path, config };
}
