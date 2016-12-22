import { spawn } from 'child_process';
import { Stdio } from '../../../types';
import { execute, defaultStdio } from '../../../helpers';

export function switchToReleaseBranch(
  releaseBranch = 'master',
  io: Stdio = defaultStdio,
  cwd: string = process.cwd(),
  _spawn = spawn)
{
  return execute('git', ['checkout', `${releaseBranch}`], io, cwd, _spawn);
}
