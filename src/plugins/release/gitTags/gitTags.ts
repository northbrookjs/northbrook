import { Stdio, NorthbrookConfig } from '../../../types';
import { execute } from '../../../helpers';
import { ReleasePackage } from '../types';
import { filterScope } from './filterScope';

export function gitTags(config: NorthbrookConfig, io: Stdio) {
  return function (releasePackages: Array<ReleasePackage>) {
    return Promise.all<ReleasePackage>(releasePackages.map(generateGitTag(config, io)));
  };
}

function generateGitTag(config: NorthbrookConfig, io: Stdio) {
  return function (releasePackage: ReleasePackage) {
    const { pkg, name, directory } = releasePackage;

    let releaseVersion = `${pkg.version}`;

    if ((config.packages as Array<string>).length > 1)
      releaseVersion = releaseVersion + `-${filterScope(name)}`;

    return execute(
      'git',
      [
        'tag',
        `v${releaseVersion}`,
      ],
      io,
      directory,
    )
      .then(() => releasePackage);
  };
}
