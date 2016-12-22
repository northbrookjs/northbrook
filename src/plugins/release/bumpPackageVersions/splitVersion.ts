import { map, filter } from 'ramda';

const notEmpty = (x: string) => x !== '';
const isX = (x: string) => x === 'x';
const toNum = (x: string) => isX(x) && x || parseInt(x);
const isNum = (x: string | number) => isX(x as string) || !Number.isNaN(x as number);

const filterMap =
  (predicate: (x: any) => boolean, project: (a: any) => any, arr: Array<any>) =>
    map(project, filter(predicate, arr));

/**
 * Splits a semantic version number into an array of 3 parts
 */
export function splitVersion (version: string) {
  const _version = filter(isNum, filterMap(notEmpty, toNum, version.split('.')));

  if (_version.length !== 3) {
    throw new Error(`${version} passed is not a proper semantic version number`);
  }

  return _version;
}
