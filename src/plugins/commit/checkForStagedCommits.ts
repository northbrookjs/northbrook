import { spawn } from 'child_process';
import { Stdio } from '../../types';
import { execute, defaultStdio } from '../../helpers';

export function checkForStagedChanges(
  io: Stdio = defaultStdio,
  cwd: string = process.cwd(),
  _spawn = spawn): Promise<boolean>
{
  return execute('git', ['commit', '--dry-run'], io, cwd, _spawn)
    .then(() => true)
    .catch(({ stdout, stderr }) => {
      if (
        stdout.indexOf('nothing added to commit') > -1 ||
        stdout.indexOf('Changes not staged for commit') > -1)
      {
        throw stdout;
      }

      throw stderr;
    });
}
