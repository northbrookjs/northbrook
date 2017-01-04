import { EOL } from 'os';
import { sequence } from '@typed/sequence';
import { NorthbrookConfig, AffectedPackages, Stdio } from '../../../types';
import { execute, getSuggestedUpdate } from '../../../helpers';

import { ReleasePackage } from '../types';
import { splitVersion } from './splitVersion';
import { incrementName } from './incrementName';
import { getNewVersion } from './getNewVersion';
import { getPackagesToUpdate } from './getPackagesToUpdate';

export function bumpPackageVersions(
  config: NorthbrookConfig,
  io: Stdio,
  options: { comver: boolean, semver: boolean },
  affectedPackages: AffectedPackages): Promise<Array<ReleasePackage>>
{
  const packages = config.packages as Array<string>;
  const affectedPackageNames: Array<string> = Object.keys(affectedPackages);

  const packagesToUpdate = getPackagesToUpdate(packages, affectedPackageNames);

  const method = options.semver ? 'semver' : options.comver ? 'comver' : 'semver';

  return performVersionBump(packagesToUpdate, affectedPackages, io, method);
}

function performVersionBump(
  packagesToUpdate: Array<any>,
  affectedPackages: AffectedPackages,
  io: Stdio,
  method: 'comver' | 'semver')
{
  const newPackages: Array<ReleasePackage> = [];

  return sequence(packagesToUpdate, bumpVersion(affectedPackages, io, method, newPackages))
    .then(() => newPackages.filter(Boolean));
};

function bumpVersion(
  affectedPackages: AffectedPackages,
  io: Stdio,
  method: 'comver' | 'semver',
  newPackages: Array<ReleasePackage>)
{
  return function (packageToUpdate: ReleasePackage) {
    const { pkg, name, directory } = packageToUpdate;

    const { commits } = affectedPackages[name];

    const suggestedUpdate = getSuggestedUpdate(commits, method);
    const increment = incrementName(suggestedUpdate);

    if (!increment)
      return Promise.resolve(void 0);

    const newVersion = getNewVersion(splitVersion(pkg.version as string), suggestedUpdate);

    io.stdout.write(`Bumping ${name} version from ${pkg.version} to ${newVersion}...` + EOL + EOL);

    const message = `chore(release): v${newVersion} [ci skip]` + EOL + EOL +
      `AFFECTS: ${name}`;

    const newPackage = { pkg: { ...pkg, version: newVersion }, name, directory, commits };

    newPackages.push(newPackage);

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
      .then(() => execute('git', ['commit', '-m', message], io, directory));
  };
};
