import { EOL } from 'os';
import { join } from 'path';
import { red } from 'typed-colors';
import { command, Command, alias, each, description } from '../../';
import { execute } from '../../helpers';

const m: { addPath: (dir: string) => void } = require('app-module-path');

export const plugin: Command =
  command(alias('exec'), description('Execute commands in all managed packages'));

each(plugin, function ({ pkg, args }, io) {
  const { path } = pkg;

  const cmd = args.shift() as string;

  io.stdout.write(`Running '${cmd} ${args.join(' ')}' in ${pkg.name}...`);

  m.addPath(path);
  m.addPath(join(path, 'node_modules'));

  return execute(cmd, args, io, path)
    .then(() => io.stdout.write(`complete!` + EOL))
    .catch(logError(io.stdout));
});

function logError(stderr: NodeJS.WritableStream) {
  return function (error: Error) {
    stderr.write(EOL + red(`ERROR`) + `: ${error.message}` + EOL + EOL);

    process.exit(1);

    throw error;
  };
}
