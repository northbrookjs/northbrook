import { Stdio } from '../../../types';
import { execute } from '../../../helpers';
import { ReleasePackage } from '../types';

export function npmLogin (io: Stdio, cwd: string) {
  return function (releasePackages: Array<ReleasePackage>) {
    return execute('npm', ['login'], io, cwd).then(() => releasePackages);
  };
}
