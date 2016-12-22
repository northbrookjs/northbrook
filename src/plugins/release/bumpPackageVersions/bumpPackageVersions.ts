import { join } from 'path';
import { EOL } from 'os';
import { map, filter } from 'ramda';
import { NorthbrookConfig, AffectedPackages, Commit, Stdio } from '../../../types';
import { execute, getSuggestedUpdate } from '../../../helpers';

import { splitVersion } from './splitVersion';
import { incrementName } from './incrementName';
import { getNewVersion } from './getNewVersion';
import { getPackagesToUpdate, getPkg } from './getPackagesToUpdate';

export function bumpPackageVersions(
  config: NorthbrookConfig,
  io: Stdio,
  options: { comver: boolean, semver: boolean })
{
  return function (affectedPackages: AffectedPackages) {
    const packages = config.packages as Array<string>;
    const affectedPackageNames: Array<string> = Object.keys(affectedPackages);

    const packagesToUpdate = getPackagesToUpdate(packages, affectedPackageNames);

    const method = options.semver ? 'semver' : options.comver ? 'comver' : 'semver';

    return performVersionBump(
      packagesToUpdate, affectedPackages, io, method);
  };
}

function performVersionBump(
  packagesToUpdate: Array<any>,
  affectedPackages: AffectedPackages,
  io: Stdio,
  method: 'comver' | 'semver')
{
  return Promise.all<any>(packagesToUpdate.map(bumpVersion(affectedPackages, io, method)));
};

function bumpVersion(affectedPackages: AffectedPackages, io: Stdio, method: 'comver' | 'semver') {
  return function (packageToUpdate: any) {
    const { pkg, name, directory } = packageToUpdate;

    const { commits } = affectedPackages[name];

    const suggestedUpdate = getSuggestedUpdate(commits, method);
    const increment = incrementName(suggestedUpdate);

    if (!increment) return Promise.resolve();

    const newVersion = getNewVersion(splitVersion(pkg.version as string), suggestedUpdate);

    const message = `chore(release): v${newVersion} [ci skip]` + EOL + EOL +
      `AFFECTS: ${name}`;

    return execute(
      'npm',
      [
        'version',
        '--no-git-tag-version',
        increment,
      ],
      io,
      directory,
    )
      .then(() => execute('git', ['add', 'package.json'], io, directory))
      .then(() => execute('git', ['commit', '-m', message], io, directory))
      .then(() => ({ pkg: { ...pkg, version: newVersion }, name, directory, commits }));
  };
}
