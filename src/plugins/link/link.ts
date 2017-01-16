import { EOL } from 'os';
import { white, blue } from 'typed-colors';
import { command, Command, each, alias, description } from '../../';

import { createPackages } from './createPackages';

export const plugin: Command =
  command(alias('link'), description('Link together dependent packages'));

each(plugin, function ({ config, pkg, depGraph }, io) {
  if (config.circular && config.circular.indexOf(pkg.name) > -1) {
    io.stdout.write(EOL + white(`> `) + ` ${blue(pkg.name)}` + EOL +
      `  skipping due to circular dependencies` + EOL);
    return Promise.resolve();
  }

  const allDependencies = depGraph.dependenciesOf(pkg.name);

  if (allDependencies.length === 0) {
    io.stdout.write(EOL + white(`> `) + ` ${blue(pkg.name)}` + EOL +
      `  has no dependencies to link` + EOL);
    return Promise.resolve();
  }

  const buildPackages: (resolve: Function, reject: Function) => void =
    createPackages(allDependencies, pkg.path, pkg.name, depGraph, io);

  return new Promise(buildPackages);
});
