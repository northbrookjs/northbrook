import { EOL } from 'os';

const Listr = require('listr');

import {
  Stdio,
  command,
  Command,
  alias,
  description,
  flag,
  withCallback,
  changedPackages,
  NorthbrookConfig,
  AffectedPackages,
} from '../../';

import { switchToReleaseBranch } from './switchToReleaseBranch';
import { runTests } from './runTests';
import { bumpPackageVersions } from './bumpPackageVersions';
import { npmLogin } from './npmLogin';
import { npmPublish } from './npmPublish';
import { gitTags } from './gitTags';
import { generateChangelogs } from './generateChangelogs';
import { gitPushToReleaseBranch } from './gitPushToReleaseBranch';

import { ReleasePackage } from './types';
import { getSuggestedUpdate } from '../../helpers';
import { getPackagesToUpdate } from './bumpPackageVersions/getPackagesToUpdate';
import { incrementName } from './bumpPackageVersions/incrementName';
import { getNewVersion } from './bumpPackageVersions/getNewVersion';
import { splitVersion } from './bumpPackageVersions/splitVersion';

const releaseDescription = description('Automated package releases');
const checkFlag = flag('boolean', alias('check'), description('Calculate releases to make'));

const comverFlag =
  flag('boolean', alias('comver'), description('Release using Compatible versioning'));

const semverFlag =
  flag('boolean', alias('semver'), description('Release using Semantic Versioning'));

const skipLoginFlag = flag('boolean', alias('skip-login'), description('Avoid logging in to NPM'));

const releaseBranch =
  flag('string', alias('release-branch'), description('Sets the git branch to push releases to'));

export const plugin: Command =
  command(
    alias('release'),
    releaseDescription,
    checkFlag,
    comverFlag,
    semverFlag,
    skipLoginFlag,
    releaseBranch,
  );

withCallback(plugin, function ({ config, directory, options }, io: Stdio) {
  switchToReleaseBranch(options.releaseBranch, io, directory)
    .then(() => io.stdout.write('Calculating changed packages...' + EOL + EOL))
    .then(() => changedPackages(directory))
    .then(affectedPackages => {
      if (Object.keys(affectedPackages).length === 0)
        throw `No packages currently require a new release`;

      const header = generateHeader(config, affectedPackages);

      if (options.check)
        throw header;

      io.stdout.write(header);

      return new Listr([
        {
          title: 'Run Tests',
          task: () => runTests(directory, io)(affectedPackages),
        },
        {
          title: 'Bump Package Versions',
          task: (ctx: any) => {
            return bumpPackageVersions(config, io, options)(affectedPackages)
              .then((packages: ReleasePackage[]) => {
                ctx.releasePackages = packages;
              });
          },
        },
        {
          title: 'NPM Login',
          task: (ctx: any) => npmLogin(io, directory)(ctx.releasePackages)
            .then((packages: ReleasePackage[]) => {
              ctx.releasePackages = packages;
            }),
        },
        {
          title: 'NPM Public',
          task: (ctx: any) => npmLogin(io, directory)(ctx.releasePackages),
        },
        {
          title: 'Create git tags',
          task: (ctx: any) => gitTags(directory, io)(ctx.releasePackages),
        },
        {
          title: 'Generate Changelogs',
          task: (ctx: any) => generateChangelogs(ctx.releasePackages),
        },
        {
          title: 'Push to release branch',
          task: () => gitPushToReleaseBranch(options.releaseBranch, directory, io),
        },
      ])
        .run();
    })
    .catch((e: Error) => io.stderr.write(e.message || e + EOL))
    .then(() => io.stdout.write(EOL));
});

const separator =
  '##----------------------------------------------------------------------------##';

function generateHeader(
  config: NorthbrookConfig,
  affectedPackages: AffectedPackages): string
{
  const packages = config.packages as Array<string>;
  const affectedPackageNames: Array<string> = Object.keys(affectedPackages);

  const packagesToUpdate = getPackagesToUpdate(packages, affectedPackageNames);

  if (packagesToUpdate.length === 0)
    return separator + EOL + reportHeaderNegative() + EOL + separator + EOL;

  let message = separator + EOL + reportHeaderPositive();

  packagesToUpdate.forEach((releasePackage: ReleasePackage) => {
    const { pkg, name, directory } = releasePackage;

    const commits = affectedPackages[name].commits;

    const suggestedUpdate = getSuggestedUpdate(commits);

    const increment = incrementName(suggestedUpdate);

    if (!increment) return;

    const newVersion = getNewVersion(splitVersion(pkg.version), suggestedUpdate);

    message += `${name} needs a new ${increment.toUpperCase()} version released because:` + EOL;

    commits.forEach(commit => {
      const { type, scope, subject, breakingChanges } = commit.message;

      message += '  - ' + `${type}(${scope}): ${subject}` +
        `${breakingChanges && ' BREAKING CHANGE'}` + EOL;
    });
  });

  message += EOL + separator + EOL;

  return message;
}

function reportHeaderPositive () {
  return '                                RELEASES TO DO' + EOL + EOL +
      'We checked all packages and recent commits, and discovered that' + '\n' +
      'you should release new versions for the following packages' + EOL + EOL;
}

function reportHeaderNegative () {
  return 'Nothing to release.' + EOL + EOL +
      'We checked all packages and recent commits, and discovered that' + EOL +
      'you do not need to release any new version.';
}
