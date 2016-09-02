import { relative, join } from 'path'
import { reduce, filter, map } from '../array'
import { getAllInDirectory, hasPkg } from '../fs'

/**
 * Gets all packages from a config file to accepts wild card syntax
 */
export function resolvePackages (config, workingDir) {
  const toRelative = name => relative(workingDir, name)

  if (config) {
    if (Array.isArray(config.packages)) {
      if (config.packages.length === 0) {
        return ['.']
      }
      return reduce(config.packages, [], (packages, packageName) => {
        if (packageName.endsWith('**')) {
          const packageDir = join(workingDir, packageName.replace('**', ''))
          const files = map(filter(getAllInDirectory(packageDir), hasPkg), toRelative)
          return packages.concat(files)
        }
        return packages.concat(packageName)
      })
    } else {
      return ['.']
    }
  }

  return []
}

/**
 *  filters all packages to match only a specific package
 */
export function onlyPackage (name, packages) {
  return filter(packages, packagename => packagename === name)
}
