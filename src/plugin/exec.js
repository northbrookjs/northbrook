import 'colors'
import { join } from 'path'
import {
  isInitialized,
  onlyPackage,
  exec as execCmd,
  separator,
  log,
  filter
} from '../util'

export const plugin = function exec (program, config, directory) {
  program.command(command).description(description)
    .option('-o, --only <packageName>', 'Only execute in a single package directory')
    .option('-e, --exclude [packageNames...]', 'Exclude directories')
    .action((...args) => action(config, directory, ...args))
}

const command = 'exec [command...]'
const description = 'Execute a command in all packages'

function filterExclusions (packages, exclusions) {
  return filter(packages, x => exclusions.indexOf(x) === -1)
}

// exported for testing
export function action (config, workingDir, args, options) {
  isInitialized(config, 'exec')

  const packages = filterExclusions(options.only
    ? onlyPackage(options.only, config.packages)
    : config.packages
    , options.exclude || []
  )

  if (packages.length === 0) {
    if (options.only) {
      return log('Cannot find package ' + options.parent.only)
    }
    return log('Cannot find any packages to execute your command :(')
  }

  const cmd = args.shift()

  const outputs = []

  function runCommand (packageName, next) {
    const packageDir = join(workingDir, packageName)
    const name = require(join(packageDir, 'package.json')).name

    // create ENV variable for scripts to use
    process.env.NORTHBROOK_EXEC_DIR = packageDir
    const output = execCmd(cmd, args, {
      cwd: packageDir,
      stdio: 'inherit',
      detached: true,
      env: Object.create(process.env),
      start: separator(name) + '\n' + '$ ' + (cmd + ' ' + args.join(' ')).white + '\n\n',
      stop: separator()
    })

    outputs.push(output)

    output.then(() => {
      next()
    })
  }

  function next () {
    if (packages.length > 0) {
      const packageName = packages.shift()
      runCommand(packageName, next)
    }
  }

  next()

  return Promise.all(outputs)
}
