import { join } from 'path';
import { cyan } from 'typed-colors';

export function tryRequire(pkgName: any, cwd: string, debug = false): any {
  (module as any).paths = Array.prototype.slice.call((module as any).paths)
      .concat([cwd, join(cwd, 'node_modules')]);

  if (debug)
    console.log(cyan(`DEBUG:`) + ` trying to require ${pkgName}`);
  try {
    const pkg = require(pkgName);

    if (debug)
      console.log(cyan(`DEBUG:`) + ` successfully required ${pkgName}`);

    return pkg;
  } catch (e) {
    if (debug)
      console.log(cyan(`DEBUG:`) + ` failed to require ${pkgName} -- ` + e.message);

    return e;
  }
}
