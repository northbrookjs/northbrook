import { EOL } from 'os';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';

import { Stdio } from '../../';
import { modifyPackageJson } from './modifyPackageJson';
import { writePackage } from './writePackage';

export function linkPackage(
  destination: string,
  packages: Map<string, any>,
  packageName: string,
  io: Stdio)
{
  return function (resolve: Function, reject: Function) {
    rimraf(destination, (error: Error) => {
      if (error) reject(error);

      mkdirp(destination, (err: Error) => {
        if (err) reject(err);

        const dep: { pkg: any, path: string } = packages.get(packageName);

        io.stdout.write(`  linking ${dep.pkg.name}... ` + EOL);
        const depPackage = JSON.stringify(modifyPackageJson(Object.assign({}, dep.pkg), dep.path));

        writePackage(destination, depPackage)(resolve, reject);
      });
    });
  };
}
