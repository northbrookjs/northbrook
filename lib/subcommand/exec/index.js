const { join } = require('path')
const { exec: execCmd, logSeparator, isInitialized } = require('../../util')

exports.plugin = exec

function exec (program, config, workingDir) {
  program
    .command('exec [command...]')
    .option('-o, --only <packageName>', 'Run a command in a single package')
    .description('execute a command in all managed packages')
    .action((command, options) => executeCommand(config, workingDir, command, options))
}

function executeCommand (config, workingDir, command, options) {
  isInitialized(config)

  const cmd = command.join(' ')

  const packages = options.only
    ? config.packages.filter(p => p === options.only)
    : config.packages

  if (packages.length === 0) {
    if (options.only) {
      return console.log('Cannot find package ' + options.only)
    }
    return console.log('Cannot find any packages to test :(')
  }

  packages.forEach(function (packageName) {
    const packageDir = join(workingDir, packageName)
    const name = require(join(packageDir, 'package.json')).name

    execCmd(cmd, { silent: true, cwd: packageDir }, () => logSeparator(name) || console.log(modOutput('   ' + cmd)))
      .then(([out]) => console.log(modOutput('\n' + out)) || logSeparator())
      .catch(([, err]) => console.log(modOutput('\n' + err)) || logSeparator())
  })
}

function modOutput (output) {
  return output.replace('\n', '\n    ')
}
