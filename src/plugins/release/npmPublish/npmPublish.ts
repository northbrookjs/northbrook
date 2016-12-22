import { Stdio } from '../../../types';
import { execute } from '../../../helpers';
import { ReleasePackage } from '../types';

export function npmPublish(io: Stdio) {
  return function (releasePackages: Array<ReleasePackage>) {
    return Promise.all(releasePackages.map(publish(io))).then(() => releasePackages);
  };
}

function publish(io: Stdio) {
  return function (pkg: ReleasePackage) {
    return execute('npm', ['publish', '--access=public'], io, pkg.directory);
  };
}
