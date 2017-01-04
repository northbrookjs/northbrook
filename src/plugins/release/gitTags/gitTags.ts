import { EOL } from 'os';
import { sequence } from '@typed/sequence';
import { Stdio, NorthbrookConfig } from '../../../types';
import { execute } from '../../../helpers';
import { ReleasePackage } from '../types';
import { filterScope } from './filterScope';

export function gitTags(config: NorthbrookConfig, io: Stdio) {
  return function (releasePackages: Array<ReleasePackage>) {
    return sequence(releasePackages, generateGitTag(config, io)).then(() => releasePackages);
  };
}

function generateGitTag(config: NorthbrookConfig, io: Stdio) {
  return function (releasePackage: ReleasePackage) {
    const { pkg, name, directory, commits } = releasePackage;

    let releaseVersion = `${pkg.version}`;

    if ((config.packages as Array<string>).length > 1)
      releaseVersion = releaseVersion + `-${filterScope(name)}`;

    io.stdout.write(`Generating git tag v${releaseVersion} for ${name}...` + EOL + EOL);

    return execute(
      'git',
      [
        'tag',
        `v${releaseVersion}`,
        `${commits[0].hash}`,
      ],
      io,
      directory,
    );
  };
}
