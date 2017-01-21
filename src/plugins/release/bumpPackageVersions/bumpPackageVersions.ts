import { EOL } from 'os';
import { stdio } from 'stdio-mock';
import { sequence } from '@typed/sequence';
import { prompt, list } from 'typed-prompts';
import { green, bold } from 'typed-colors';
import { NorthbrookConfig, AffectedPackages, Stdio, Commit } from '../../../types';
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

const choices = [`1.0.0`, `0.1.0`, `0.0.1`];

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

    const args = ['version', '--no-git-tag-version'];

    const versionQuestion = list(
      `version`,
      `What version would you like to start with? `,
      choices,
      {
        default: `1.0.0`,
      },
    );

    return execute('npm', ['dist-tag', 'ls', name], stdio(), directory)
      .then(() => {
        const newVersion = getSuggestedVersion(pkg.version as string, suggestedUpdate);

        logUpdate(pkg.version as string, newVersion, name, io);
        generateNewPkg(pkg, newVersion, name, directory, commits, newPackages);

        const message = generateCommitMessage(newVersion, name);

        return execute('npm', args.concat(increment), io, directory)
          .then(() => execute('git', ['add', 'package.json'], io, directory))
          .then(() => execute('git', ['commit', '-m', message], io, directory));
      })
      .catch(() => {
        io.stdout.write(bold(green(`No previous versions for ${name} could be found...`)) + EOL);

        return prompt<{ version: string }>([ versionQuestion ])
          .then(({ version: newVersion }) => {
            if (pkg.version === newVersion) return Promise.resolve(void 0);

            generateNewPkg(pkg, newVersion, name, directory, commits, newPackages);

            const message = generateCommitMessage(newVersion, name);

            return execute('npm', args.concat(newVersion), io, directory)
              .then(() => execute('git', ['add', 'package.json'], io, directory))
              .then(() => execute('git', ['commit', '-m', message], io, directory));
          });
      });
  };
};

function logUpdate(previousVersion: string, newVersion: string, name: string, io: Stdio) {
  io.stdout.write(
    `Bumping ${name} version from ${previousVersion} to ${newVersion}...` + EOL + EOL);
}

function getSuggestedVersion(version: string, suggestedUpdate: number) {
  return getNewVersion(splitVersion(version), suggestedUpdate);
}

function generateCommitMessage(version: string, name: string) {
  return `chore(release): v${version} [ci skip]` + EOL + EOL + `AFFECTS: ${name}`;
}

function generateNewPkg(
  pkg: ReleasePackage,
  newVersion: string,
  name: string,
  directory: string,
  commits: Commit[],
  newPackages: Array<ReleasePackage>)
{
  const newPackage: ReleasePackage =
    Object.assign({}, { name, directory, commits, pkg: { ...pkg, version: newVersion } });

  newPackages.push(newPackage);
}
