import { join } from 'path'
import {
  isInitialized,
  map,
  onlyPackage,
  exec as execCmd,
  separator,
  log
} from '../util'

export const plugin = function exec (program, config, directory) {
  program.command(command).description(description)
    .option('-o, --only <packageName>', 'Only execute in a single package directory')
    .action((...args) => action(config, directory, ...args))
}

const command = 'exec [command...]'
const description = 'Execute a command in all packages'

// exported for testing
export function action (config, workingDir, command, options) {
  isInitialized(config, 'exec')

  const packages = options.parent.only
    ? onlyPackage(options.parent.only, config.packages)
    : config.packages

  if (packages.length === 0) {
    if (options.only) {
      return log('Cannot find package ' + options.parent.only)
    }
    return log('Cannot find any packages to execute your command :(')
  }

  const cmd = command.join(' ')

  // return promise for testing
  return Promise.all(map(packages, function (packageName) {
    const packageDir = join(workingDir, packageName)
    const name = require(join(packageDir, 'package.json')).name

    return execCmd(cmd, { silent: true, cwd: packageDir })
      .then(({ cmd, code, err, out }) => {
        log(separator(name))
        log(cmd)
        log(out)
        log(separator())
        return { cmd, code, err, out }
      })
  }))
}
