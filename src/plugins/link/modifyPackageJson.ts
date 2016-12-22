import { join } from 'path';
import { pathFields } from './pathFields';

export function modifyPackageJson(pkg: any, path: string): any {
  for (let i = 0; i < pathFields.length; ++i) {
    const fieldName = pathFields[i];

    if (pkg[fieldName])
      pkg[fieldName] = join(path, pkg[fieldName]);
  }

  return pkg;
}
