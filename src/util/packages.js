import { filter, map } from './array'

export const filterScopes = name => name.replace(/@[a-z]+\//g, '')

const notEmpty = x => x !== ''
const isX = x => x === 'x'
const toNum = x => isX(x) && x || parseInt(x)
const isNum = x => isX(x) || !Number.isNaN(x)

const filterMap = (predicate, project, arr) =>
  map(filter(arr, predicate), project)

/**
 * Splits a semantic version number into an array of 3 parts
 */
export function splitVersion (version) {
  const _version = filter(filterMap(notEmpty, toNum, version.split('.')), isNum)

  if (_version.length !== 3) {
    throw new Error(`${version} passed is not a proper semantic version number`)
  }

  return _version
}
