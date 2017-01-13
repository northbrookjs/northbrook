import {
  AffectedPackages,
  Command,
  NorthbrookConfig,
  Stdio,
  alias,
  changedPackages,
  command,
  description,
  flag,
  withCallback,
} from '../../';
import { bold, cyan, underline } from 'typed-colors';

import { EOL } from 'os';
import { ReleasePackage } from './types';
import { bumpPackageVersions } from './bumpPackageVersions';
import { generateChangelogs } from './generateChangelogs';
import { getPackagesToUpdate } from './bumpPackageVersions/getPackagesToUpdate';
import { getSuggestedUpdate } from '../../helpers';
import { gitPushToReleaseBranch } from './gitPushToReleaseBranch';
import { gitTags } from './gitTags';
import { incrementName } from './bumpPackageVersions/incrementName';
import { npmLogin } from './npmLogin';
import { npmPublish } from './npmPublish';
import { runTests } from './runTests';
import { spawnSync } from 'child_process';
import { switchToReleaseBranch } from './switchToReleaseBranch';

const { start, stop, change_sequence } = require('simple-spinner');

change_sequence([
  '    ',
  '•   ',
  '••  ',
  '••• ',
  '••••',
  'ᗧ•••',
  'ⵔ•••',
  ' ᗧ••',
  ' ⵔ••',
  '  ᗧ•',
  '  ⵔ•',
  '   ᗧ',
  '   ⵔ',
]);

const releaseDescription = description('Automated package releases');
const checkFlag = flag('boolean', alias('check'), description('Calculate releases to make'));

const comverFlag =
  flag('boolean', alias('comver'), description('Release using Compatible versioning'));

const semverFlag =
  flag('boolean', alias('semver'), description('Release using Semantic Versioning'));

const skipLoginFlag = flag('boolean', alias('skip-login'), description('Avoid logging in to NPM'));

const releaseBranch =
  flag('string', alias('release-branch'), description('Sets the git branch to push releases to'));

const skipTestsFlag =
  flag('boolean', alias('skip-tests'), description('Avoid re-running tests'));

export const plugin: Command =
  command(
    alias('release'),
    releaseDescription,
    checkFlag,
    comverFlag,
    semverFlag,
    skipLoginFlag,
    releaseBranch,
    skipTestsFlag,
  );

function isDirectoryClean (workingDir: string): boolean {
  const isUnstagedChanges =
    spawnSync('git diff --exit-code', { cwd: workingDir }).status;
  const isStagedChanged =
    spawnSync('git diff --cached --exit-code', { cwd: workingDir}).status;
  return !(isUnstagedChanges || isStagedChanged);
}

withCallback(plugin, function ({ config, directory, options }, io: Stdio) {
  if (!isDirectoryClean(directory))
    return io.stdout.write(`Git Directory is not clean` + EOL + EOL);

  const begin = options.check
    ? changedPackages(directory)
    : switchToReleaseBranch(options.releaseBranch, void 0, directory)
        .then(() => changedPackages(directory));

  return begin
    .then(affectedPackages => {
      if (Object.keys(affectedPackages).length === 0)
        throw `No packages currently require a new release`;

      const method = options.comver ? 'comver' : 'semver';

      const header = generateHeader(config, affectedPackages, method);

      if (options.check) {
        stop();
        io.stdout.write(header + EOL + EOL);
        process.exit(0);
      }

      io.stdout.write(header);

      if (!options.skipTests) {
        io.stdout.write(EOL + bold(`Running tests`));
        start();
      }

      return runTests(directory, options)
        .then(() => { stop(); io.stdout.write(EOL + EOL); } )
        .then(() => bumpPackageVersions(config, io, options, affectedPackages))
        .then((packages: Array<ReleasePackage>) => {

          if (!options.skipLogin) {
            io.stdout.write('Logging in to NPM...' + EOL + EOL);
            return npmLogin(io, directory).then(() => packages);
          }

          return packages;
        })
        .then(gitTags(config, io))
        .then(generateChangelogs)
        .then(npmPublish(io))
        .then(() => gitPushToReleaseBranch(options.releaseBranch, directory, io));
    })
    .then(() => {
      stop();
      io.stdout.write(EOL);
    })
    .catch((e: any) => {
      stop();

      if (e.stderr) {
        io.stderr.write(e.stderr + EOL);
      } else {
        io.stderr.write((e.message || e) + EOL);
      }

      process.exit(1);
    });
});

const separator =
  '##----------------------------------------------------------------------------##';

function generateHeader(
  config: NorthbrookConfig,
  affectedPackages: AffectedPackages,
  method: 'comver' | 'semver'): string
{
  const packages = config.packages as Array<string>;
  const affectedPackageNames: Array<string> = Object.keys(affectedPackages);

  const packagesToUpdate = getPackagesToUpdate(packages, affectedPackageNames);

  if (packagesToUpdate.length === 0)
    return separator + EOL + reportHeaderNegative() + EOL + separator + EOL;

  let message = separator + EOL + reportHeaderPositive();

  packagesToUpdate.forEach((releasePackage: ReleasePackage) => {
    const { name } = releasePackage;

    const commits = affectedPackages[name].commits;

    const suggestedUpdate = getSuggestedUpdate(commits, method);

    const increment = incrementName(suggestedUpdate);

    if (!increment) return;

    message += `${cyan(bold(name))} ` +
      `needs a new ${bold(increment.toUpperCase())} version released:` + EOL;

    commits.forEach(commit => {
      const { type, scope, subject, breakingChanges } = commit.message;

      message += bold('  - ') + `${type}(${scope}): ${subject}` +
        `${breakingChanges && ' - ' + cyan('BREAKING CHANGE') || ''}` + EOL;
    });
  });

  message += EOL + separator + EOL;

  return message;
}

function reportHeaderPositive () {
  return '                                ' + underline(bold('RELEASES TO DO')) + EOL + EOL +
      'We checked all packages and recent commits and discovered that' + '\n' +
      'you should release new versions for the following packages' + EOL + EOL;
}

function reportHeaderNegative () {
  return 'Nothing to release.' + EOL + EOL +
      'We checked all packages and recent commits and discovered that' + EOL +
      'you do not need to release any new version.';
}
