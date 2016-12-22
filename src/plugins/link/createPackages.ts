import { EOL } from 'os';
import { join } from 'path';
import * as mkdirp from 'mkdirp';
import { pointer } from 'typed-figures';
import { forEach } from 'ramda';
import { linkPackage } from './linkPackage';
import { Stdio } from '../../';

export function createPackages(
  dependencies: Array<string>,
  path: string,
  name: string,
  packages: Map<string, any>,
  io: Stdio)
{
  return function (resolve: Function, reject: Function) {
    mkdirp(join(path, 'node_modules'), (err: Error) => {
      if (err) reject(err);

      io.stdout.write(EOL + pointer + ` ${name} ` + EOL);

      const link = linkDependencies(path, packages, io, resolve, reject);

      forEach(link, dependencies);
    });
  };
}

function linkDependencies(
  path: string,
  packages: Map<string, any>,
  io: Stdio,
  resolve: Function,
  reject: Function)
{
  return function (depName: string) {
    const destination = join(path, 'node_modules', depName);

    linkPackage(destination, packages, depName, io)(resolve, reject);
  };
}
