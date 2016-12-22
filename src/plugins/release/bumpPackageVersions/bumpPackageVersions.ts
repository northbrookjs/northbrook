import { join } from 'path';
import { map, filter } from 'ramda';
import { NorthbrookConfig, AffectedPackages, Commit, Stdio } from '../../../types';
import { execute, getSuggestedUpdate } from '../../../helpers';

import { splitVersion } from './splitVersion';
import { incrementName } from './incrementName';
import { getNewVersion } from './getNewVersion';
import { getPackagesToUpdate, getPkg } from './getPackagesToUpdate';

export function bumpPackageVersions(config: NorthbrookConfig, io: Stdio) {
  return function (affectedPackages: AffectedPackages) {
    const packages = config.packages as Array<string>;
    const affectedPackageNames: Array<string> = Object.keys(affectedPackages);

    const packagesToUpdate = getPackagesToUpdate(packages, affectedPackageNames);

    return performVersionBump(packagesToUpdate, affectedPackages, io);
  };
}

function performVersionBump(
  packagesToUpdate: Array<any>,
  affectedPackages: AffectedPackages,
  io: Stdio)
{
  return Promise.all<any>(packagesToUpdate.map(bumpVersion(affectedPackages, io)));
};

function bumpVersion(affectedPackages: AffectedPackages, io: Stdio) {
  return function (packageToUpdate: any) {
    const { pkg, name, directory } = packageToUpdate;

    const { commits } = affectedPackages[name];

    const suggestedUpdate = getSuggestedUpdate(commits);
    const increment = incrementName(suggestedUpdate);

    if (!increment) return Promise.resolve();

    const newVersion = getNewVersion(splitVersion(pkg.version as string), suggestedUpdate);

    return execute(
      'npm',
      [
        'version',
        '--no-git-tag-version',
        increment,
        '-m',
        `'release(${name}): v${newVersion} [ci skip]'`,
      ],
      io,
      directory,
    )
      .then(() => ({ pkg: getPkg(directory).pkg, name, directory, commits }));
  };
}
