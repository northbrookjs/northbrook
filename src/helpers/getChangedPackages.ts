import { join } from 'path';
import { Pkg, changedPackages } from '../';

export function getChangedPackages(packages: Array<string>) {
  return changedPackages()
    .then(affectedPackages => filterPkgs(packages, Object.keys(affectedPackages)));
}

function filterPkgs(
  packages: Array<string>,
  affectedPackageNames: Array<string>)
{
  const allPackages = packages.map(getPkg);

  return allPackages.filter(filterAffected(affectedPackageNames));
}

export function getPkg(path: string): Pkg {
  const pkg = require(join(path, 'package.json'));

  return {
    path,
    config: pkg,
    name: pkg.name,
  };
}

function filterAffected(affectedPackageNames: Array<string>) {
  return function (pkg: any) {
    return affectedPackageNames.indexOf(pkg.name) > -1;
  };
}
