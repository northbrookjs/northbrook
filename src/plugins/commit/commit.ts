import { EOL } from 'os';
import { join } from 'path';
import { exec } from 'child_process';
import { command, Command, alias, description, withCallback } from '../../';
import { createCommit } from './createCommit';
import { checkForStagedChanges } from './checkForStagedCommits';

import { askQuestions } from './questions';

export const plugin: Command =
  command(alias('commit'), description('Powerful git commit messages'));

withCallback(plugin, ({ config, directory }, io) => {
  const packageNames = (config.packages as Array<string>).map(toPkgName);

  checkForStagedChanges()
    .then(() => askQuestions(packageNames))
    .then(answers => createCommit(answers, io, directory))
    .catch((err: Error) => {
      io.stderr.write(err + EOL);
    });
});

function toPkgName(path: string) {
  return require(join(path, 'package.json')).name;
}
