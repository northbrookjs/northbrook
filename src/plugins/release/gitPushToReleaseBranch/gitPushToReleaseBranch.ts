import { EOL } from 'os';
import { Stdio } from '../../../types';
import { execute, defaultStdio } from '../../../helpers';

export function gitPushToReleaseBranch(
  releaseBranch = 'master',
  cwd: string = process.cwd(),
  io: Stdio = defaultStdio,
) {
  io.stdout.write(`Pushing changes to ${releaseBranch}...` + EOL + EOL);
  return execute('git', ['push', 'origin', releaseBranch, '--tags'], io, cwd);
}
