import { spawn } from 'child_process';
import { Stdio } from '../../../types';
import { stdio } from 'stdio-mock';
import { execute } from '../../../helpers';

export function switchToReleaseBranch(
  releaseBranch = 'master',
  io: Stdio = stdio(),
  cwd: string = process.cwd(),
  _spawn = spawn)
{
  return execute('git', ['checkout', `${releaseBranch}`], io, cwd, _spawn);
}
