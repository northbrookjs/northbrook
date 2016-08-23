import { join } from 'path'
import { createWriteStream, readFileSync } from 'fs'
import { exec as execSync } from 'shelljs'
import {
  isInitialized,
  isFile,
  forEach,
  exec,
  chdir,
  separator,
  log,
  splitVersion
} from '../../util'
import { start, stop, change_sequence as changeSeq } from 'simple-spinner'
import { checkRelease } from './check-release'
import { generateChangelog } from './generate-changelog'

changeSeq(['    ', '.   ', '..  ', '... ', '....', ' ...', '  ..', '   .'])

export const plugin = function release (program, config, directory) {
  program.command('release')
    .option('--check', 'only checks what needs to be released')
    .description('Publishes updates')
    .action((options) => action(config, directory, options))
}

function incrementName (code) {
  switch (code) {
    case 1: return 'patch'
    case 2: return 'minor'
    case 3: return 'major'
    default: return false
  }
}

function isDirectoryClean () {
  const isUnstagedChanges = execSync('git diff --exit-code', {silent: true}).code
  const isStagedChanged = execSync('git diff --cached --exit-code', {silent: true}).code
  return !(isUnstagedChanges || isStagedChanged)
}

function action (config, directory, options) {
  isInitialized(config)

  const releaseBranch = config && typeof config.releaseBranch === 'string'
    ? config.releaseBranch
    : 'master'

  const packages = config.packages.map(getPkg(directory))

  checkRelease(packages).then(function (status) {
    const packageNames = Object.keys(status)

    forEach(packageNames, function (packageName) {
      const index = packages.indexOf(packageName)
      const relativePath = config.packages[index]

      const packageDirectory = join(directory, relativePath)
      const pkg = require(join(packageDirectory, 'package.json'))
      const currentVersion = splitVersion(require(join(packageDirectory, 'package.json')).version)
      const method = incrementName(status[packageName].increment)
      const newVersion = getNewVersion(currentVersion, status[packageName].increment)

      const check = options && options.check

      const changelog = join(packageDirectory, 'CHANGELOG.md')
      let previousFile = '\n'

      if (isFile(changelog)) {
        previousFile = readFileSync(changelog, 'utf8')
      }

      if (check || isDirectoryClean()) {
        if (!method || check || pkg.private) {
          console.log(separator(packageName))
          if (pkg.private) {
            log('Package is private; only generating changelog')
          }
        }

        // generateChangelog
        generateChangelog({
          commits: status[packageName].commits,
          file: check ? process.stdout : createFileStream(changelog),
          version: newVersion,
          url: pkg.repository.url || pkg.repository,
          bugs: pkg.bugs,
          previousFile
        })

        if (!method || check || pkg.private) {
          if (!check) {
            execute(
              'git add CHANGELOG.md',
              'git commit -m "docs(CHANGELOG): append to changelog"',
              `git tag -f ${newVersion}`,
              `git push origin ${releaseBranch}`,
              'git push origin --tags'
            )
          }
          return console.log(separator())
        }

        // preform release
        chdir(packageDirectory)

        console.log(separator(packageName))
        process.stdout.write('    Running your tests')
        start()
        exec('npm test')
          .then(handleTestOutput(method, packageName, newVersion))
          .catch(handleTestError)
          .then(handleVersionOutput(method))
          .then(handlePublishOutput(releaseBranch))
          .then(() => {
            execute(
              'git add CHANGELOG.md',
              'git commit -m "docs(CHANGELOG): append to changelog"',
              `git push origin ${releaseBranch}`,
              'git push origin --tags'
            )
          })

        chdir(directory)
      } else {
        log('RELEASE ERROR: Working directory must be clean to push release!')
      }
    })
  })
}

function execute (...commands) {
  function _exec (cmd) {
    const code = execSync(cmd).code
    if (code === 0 && commands.length > 0) {
      const _cmd = commands.shift()
      return _exec(_cmd).code
    }
  }

  return _exec(commands.shift())
}

function createFileStream (file) {
  if (!isFile(file)) {
    exec(`touch ${file}`, { silent: true, async: false })
  }
  return createWriteStream(file)
}

function handleTestOutput (method, packageName, newVersion) {
  return function ({ code, out, err }) {
    if (code === 0) {
      stop()
      log(out)
      process.stdout.write('    Running npm version')
      start()
      return exec(`npm version ${method} -m 'release(${packageName}): ${newVersion}'`)
    } else {
      throw out
    }
  }
}

function handleTestError (err) {
  stop()
  log('\n')
  log('Running your tests have failed: \n')
  log('    ' + err)
  console.log(separator())
}

function handleVersionOutput (method) {
  return function ({code, out, err}) {
    if (code === 0) {
      stop()
      log(out)
      process.stdout.write('    Publishing your package')
      start()
      return exec('npm publish --access=public')
    } else {
      stop()
      log('\n')
      log(`npm version ${method} has failed: \n`)
      log()
      log(err)
      log()
      throw err
    }
  }
}

function handlePublishOutput (releaseBranch) {
  return function ({ code, out, err }) {
    stop()
    if (code === 0) {
      log(out)
      exec(`git push origin ${releaseBranch}`)
      console.log(separator())
    } else {
      log('Publishing your package has failed: \n')
      log(err)
      console.log(separator())
    }
  }
}

function getNewVersion ([major, minor, patch], increment) {
  switch (increment) {
    case 1: return `v${major}.${minor}.${parseInt(patch) + 1}`
    case 2: return `v${major}.${parseInt(minor) + 1}.0`
    case 3: return `v${parseInt(major) + 1}.0.0`
    default: return `v${major}.${minor}.${patch}`
  }
}

const getPkg = dir => name =>
  require(join(dir, name, 'package.json')).name
