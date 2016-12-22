export function tryRequire(pkgName: any): any {
  try {
    return require(pkgName);
  } catch (e) {
    return e;
  }
}
