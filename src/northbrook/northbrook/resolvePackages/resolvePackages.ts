import { EOL } from 'os';
import { join } from 'path';
import { readdirSync } from 'fs';
import { map, filter, flatten } from 'ramda';
import { cyan, yellow } from 'typed-colors';
import { isFile } from '../../../helpers';
import { Stdio } from '../../../types';

// finds all require()-able packages
export function resolvePackages(
  packages: Array<string>,
  cwd: string = process.cwd(),
  stdio: Stdio,
  debug = false,
): Array<string>
{
  return filter(Boolean, flatten(map(resolvePackage(cwd, stdio, debug), packages)));
}

function resolvePackage(cwd: string, stdio: Stdio, debug: boolean) {
  return function (packagePath: string) {
    // allow shorthand for directories with lots of packages
    if (packagePath.endsWith('*') || packagePath.endsWith('**')) {
      const packagesPath = join(cwd, packagePath.replace(/(\*)+$/, ''));
      const packages = getAllDirectories(packagesPath);
      return map(name => resolve(join(packagesPath, name), stdio, debug), packages);
    }

    return resolve(join(cwd, packagePath), stdio, debug);
  };
}

// if a directory contains a package.json
function resolve(path: string, stdio: Stdio, debug: boolean) {
  if (isFile(path)) return null;

  if (hasPkg(path)) {
    if (debug)
      stdio.stdout.write(`${cyan('DEBUG')}: Resolved package: ${path}` + EOL);

    return path;
  };

  stdio.stdout.write(yellow(`WARNING`) + `: Could not resolve package: ${path}` + EOL);

  return null;
}

function hasPkg(path: string): boolean {
  return isFile(join(path, 'package.json'));
}

function getAllDirectories(rootDirectory: string): Array<string> {
  return readdirSync(rootDirectory);
}
