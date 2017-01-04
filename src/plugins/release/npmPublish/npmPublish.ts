import { EOL } from 'os';
import { sequence } from '@typed/sequence';
import { Stdio } from '../../../types';
import { execute } from '../../../helpers';
import { ReleasePackage } from '../types';

export function npmPublish(io: Stdio) {
  return function (releasePackages: Array<ReleasePackage>) {
    return sequence(releasePackages, publish(io)).then(() => releasePackages);
  };
}

function publish(io: Stdio) {
  return function (pkg: ReleasePackage) {
    io.stdout.write(`Publishing v${pkg.pkg.version} of ${pkg.name}...` + EOL + EOL);
    return execute('npm', ['publish', '--access=public'], io, pkg.directory);
  };
}
