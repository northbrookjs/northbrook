import { EOL } from 'os';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';

import { Stdio, DepGraph } from '../../';
import { modifyPackageJson } from './modifyPackageJson';
import { writePackage } from './writePackage';

export function linkPackage(
  destination: string,
  depGraph: DepGraph,
  packageName: string,
  io: Stdio)
{
  return function (resolve: Function, reject: Function) {
    rimraf(destination, (error: Error) => {
      if (error) reject(error);

      mkdirp(destination, (err: Error) => {
        if (err) reject(err);

        const pkg = depGraph.configOf(packageName);

        io.stdout.write(`  linking ${pkg.name}... ` + EOL);
        const depPackage = JSON.stringify(modifyPackageJson(pkg.config, pkg.path));

        writePackage(destination, depPackage)(resolve, reject);
      });
    });
  };
}
