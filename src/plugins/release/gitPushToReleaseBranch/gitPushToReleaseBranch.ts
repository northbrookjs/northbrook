import { Stdio } from '../../../types';
import { execute, defaultStdio } from '../../../helpers';

export function gitPushToReleaseBranch(
  releaseBranch = 'master',
  cwd: string = process.cwd(),
  io: Stdio = defaultStdio,
) {
  return execute('git', ['push', releaseBranch, '--tags'], io, cwd);
}
