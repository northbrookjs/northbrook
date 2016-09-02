import { join } from 'path'
import { statSync, lstatSync, readdirSync } from 'fs'

import { reduce } from './array'

/**
 * tests if an absolute path exists
 */
export function exists (pathname) {
  try {
    return statSync(pathname)
  } catch (e) {
    return false
  }
}

/**
 * tests if an absolute path is a directory
 */
export function isDirectory (pathname) {
  const stats = exists(pathname)
  return stats ? stats.isDirectory() : false
}

/**
 * tests if an absolute path is a file
 */
export function isFile (pathname) {
  const stats = exists(pathname)
  return stats ? stats.isFile() : false
}

/**
 * tests if an absolute path is a symbolic link
 */
export function isLink (pathname) {
  try {
    lstatSync(pathname).isSymbolicLink()
  } catch (e) {
    return false
  }
}

/**
 * Gets all files in a directory
 */
export function getAllInDirectory (directory, recursive = false) {
  return reduce(readdirSync(directory), [], (files, file) => {
    const abspath = join(directory, file)

    if (isFile(abspath)) {
      return files.concat(file)
    }

    if (recursive && isDirectory(abspath)) {
      return files.concat(...getAllInDirectory(abspath))
    }

    return files
  })
}

export const hasPkg = file => isFile(join(file, 'package.json'))
