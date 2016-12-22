import { join } from 'path';

export function getPackagesToUpdate(
  packages: Array<string>,
  affectedPackageNames: Array<string>)
{
  const allPackages = packages.map(getPkg);

  return allPackages.filter(filterAffected(affectedPackageNames));
}

export function getPkg(directory: string) {
  const pkg = require(join(directory, 'package.json'));

  return {
    directory,
    pkg,
    name: pkg.name,
  };
}

function filterAffected(affectedPackageNames: Array<string>) {
  return function (pkg: any) {
    return affectedPackageNames.indexOf(pkg.name) > -1;
  };
}
