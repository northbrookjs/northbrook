import { spawn } from 'child_process';
import { stdio } from 'stdio-mock';
import { Stdio, AffectedPackages } from '../../../types';
import { execute } from '../../../helpers';

export function runTests(directory: string, options: any, io: Stdio = stdio(), _spawn = spawn) {
  return function (affectedPackages: AffectedPackages) {
    if (options.skipTests) return Promise.resolve(affectedPackages);

    return execute('npm', ['test'], io, directory, _spawn)
      .then(() => affectedPackages);
  };
}
