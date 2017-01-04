import { spawn } from 'child_process';
import { stdio } from 'stdio-mock';
import { Stdio } from '../../../types';
import { execute } from '../../../helpers';

export function runTests(
  directory: string,
  options: any,
  io: Stdio = stdio(),
  _spawn = spawn): Promise<any>
{
  if (options.skipTests) return Promise.resolve();

  return execute('npm', ['test'], io, directory, _spawn);
}
