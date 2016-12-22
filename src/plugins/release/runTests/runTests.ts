import { EOL } from 'os';
import { spawn } from 'child_process';
import { stdio } from 'stdio-mock';
import { Stdio, AffectedPackages } from '../../../types';
import { execute } from '../../../helpers';

export function runTests(directory: string, io: Stdio = stdio(), _spawn = spawn) {
  return function (affectedPackages: AffectedPackages) {
    return execute('npm', ['test', '--silent'], io, directory, _spawn)
      .then(() => affectedPackages);
  };
}
