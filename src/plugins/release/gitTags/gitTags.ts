import { Stdio } from '../../../types';
import { execute } from '../../../helpers';
import { ReleasePackage } from '../types';

export function gitTags(directory: string, io: Stdio) {
  return function (releasePackages: Array<ReleasePackage>) {
    return Promise.all<ReleasePackage>(releasePackages.map(generateGitTag(directory, io)));
  };
}

function generateGitTag(directory: string, io: Stdio) {
  return function (releasePackage: ReleasePackage) {
    const { pkg, name } = releasePackage;

    return execute(
      'git',
      [
        'tag',
        `v${pkg.version}-${name}`,
      ],
      io,
      directory,
    )
      .then(() => releasePackage);
  };
}
