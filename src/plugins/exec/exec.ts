import { EOL } from 'os';
import { join } from 'path';
import { spawn } from 'child_process';
import { pointer } from 'typed-figures';
import { bold, cyan, italic, red } from 'typed-colors';
import { command, Command, alias, each, description, Stdio } from '../../';
import { execute } from '../../helpers';

const m: {
  addPath: (dir: string) => void,
  removePath: (dir: string) => void,
} = require('app-module-path');

export const plugin: Command =
  command(alias('exec'), description('Execute commands in all managed packages'));

const logError = (stderr: NodeJS.WritableStream) => (e: Error) =>
  stderr.write(EOL + red(`ERROR`) + `: ${e.message}` + EOL + EOL);

each(plugin, function ({ pkg, args }, io) {
  const { name, path } = pkg;

  const cmd = args.shift() as string;

  m.addPath(path);
  m.addPath(join(path, 'node_modules'));

  return execute(cmd, args, io, path)
    .catch(logError(io.stdout))
    .then(() => {
      m.removePath(path);
      m.removePath(join(path, 'node_modules'));
    });
});
