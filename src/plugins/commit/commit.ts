import { EOL } from 'os';
import { join } from 'path';
import { command, Command, alias, description, withCallback } from '../../';
import { execute } from '../../helpers';
import { createCommit } from './createCommit';

import { askQuestions } from './questions';

export const plugin: Command =
  command(alias('commit'), description('Powerful git commit messages'));

withCallback(plugin, ({ config, directory }, io) => {
  const packageNames = (config.packages as Array<string>).map(toPkgName);

  execute('git', ['commit', '--dry-run'], io, directory)
    .then(() => askQuestions(packageNames))
    .then(answers => createCommit(answers, io, directory))
    .catch(({ stdout, stderr }) => {
        io.stdout.write(stdout + EOL);
        io.stderr.write(stderr + EOL);
    });
});

function toPkgName(path: string) {
  return require(join(path, 'package.json')).name;
}
