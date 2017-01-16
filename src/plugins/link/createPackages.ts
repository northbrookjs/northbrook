import { EOL } from 'os';
import { join } from 'path';
import * as mkdirp from 'mkdirp';
import { pointer } from 'typed-figures';
import { linkPackage } from './linkPackage';
import { Stdio, DepGraph } from '../../';

export function createPackages(
  dependencies: Array<string>,
  path: string,
  name: string,
  depGraph: DepGraph,
  io: Stdio)
{
  return function (resolve: any, reject: any) {
    mkdirp(join(path, 'node_modules'), (err: Error) => {
      if (err) reject(err);

      io.stdout.write(EOL + pointer + ` ${name} ` + EOL);

      const link = linkDependencies(path, depGraph, io);

      Promise.all<any>(dependencies.map(link)).then(resolve).catch(reject);
    });
  };
}

function linkDependencies(
  path: string,
  depGraph: DepGraph,
  io: Stdio)
{
  return function (depName: string) {
    const destination = join(path, 'node_modules', depName);

    return new Promise((resolve, reject) => {
      linkPackage(destination, depGraph, depName, io)(resolve, reject);
    });
  };
}
