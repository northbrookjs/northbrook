import { join } from 'path'
import { readFileSync } from 'fs'
import { exec as execSync } from 'shelljs'
import { isInitialized, isFile, exec, chdir, separator, log, splitVersion, filterScopes } from '../../util'
import { start, stop, change_sequence as changeSeq } from 'simple-spinner'
import { checkRelease } from './check-release'
import { generateChangelog } from './generate-changelog'

changeSeq(['    ', '.   ', '..  ', '... ', '....', ' ...', '  ..', '   .'])

export const plugin = function release (program, config, directory) {
  program.command('release')
    .option('--check', 'only checks what needs to be released')
    .option('--skip-git', 'skip automatically pushing to your git release branch')
    .option('--skip-login', 'skip running npm login')
    .option('--skip-npm', 'do not automatically publish to npm')
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

function isDirectoryClean (workingDir) {
  const isUnstagedChanges = execSync('git diff --exit-code', {silent: true, cwd: workingDir}).code
  const isStagedChanged = execSync('git diff --cached --exit-code', {silent: true, cwd: workingDir}).code
  return !(isUnstagedChanges || isStagedChanged)
}

function action (config, directory, options) {
  isInitialized(config)

  const releaseBranch = config && typeof config.releaseBranch === 'string'
    ? config.releaseBranch
    : 'master'

  const skipGit = options && options.skipGit
  const skipNpm = options && options.skipNpm
  const skipLogin = options && options.skipLogin

  const { code } = execSync('git checkout ' + releaseBranch, { silent: true, cwd: directory })

  if (code !== 0) {
    throw new Error('Could not switch to ' + releaseBranch)
  }

  const packages = config.packages.map(getPkg(directory)).map(filterScopes)

  checkRelease(packages).then(function (status) {
    const packageNames = Object.keys(status).filter((name) => status[name].increment > 0)

    function release (packageName) {
      const index = packages.indexOf(packageName)
      const relativePath = config.packages[index]

      const packageDirectory = join(directory, relativePath)
      const pkg = require(join(packageDirectory, 'package.json'))
      const currentVersion = splitVersion(require(join(packageDirectory, 'package.json')).version)
      const method = incrementName(status[packageName].increment)
      const newVersion = getNewVersion(currentVersion, status[packageName].increment)

      const check = options && options.check || false

      const changelog = join(packageDirectory, 'CHANGELOG.md')
      let previousFile = '\n'

      if (isFile(changelog)) {
        previousFile = readFileSync(changelog, 'utf8')
      }

      if (check || isDirectoryClean(directory)) {
        if (!method || check || pkg.private) {
          console.log(separator(packageName))
          if (pkg.private) {
            log('Package is private; only generating changelog')
          }
        }

        const changelogOptions = {
          commits: status[packageName].commits,
          file: check ? process.stdout : changelog,
          version: newVersion,
          url: pkg.repository.url.replace('.git', '').replace('git+', '') || pkg.repository,
          bugs: pkg.bugs,
          previousFile
        }

        if (!method || check || pkg.private) {
          return generateChangelog(changelogOptions).then(() => {
            if (check) {
              console.log(separator())
              continueReleasing()
            }
            if (!check && method || pkg.private) {
              if (!skipGit) {
                execute(packageDirectory,
                  'git add CHANGELOG.md',
                  'git commit -m "docs(CHANGELOG): append to changelog [ci skip]"',
                  `git tag -f ${newVersion}-${packageName}`,
                  `git push origin ${releaseBranch}`,
                  'git push origin --tags'
                )
              }
              console.log(separator())
              continueReleasing()
            }
          })
        }

        // preform release
        chdir(packageDirectory)

        console.log(separator(packageName))
        log('    Running your tests')
        start()
        exec('npm', ['test'], { cwd: packageDirectory, stdio: 'inherit' })
          .then(handleTestOutput(method, packageName, newVersion, packageDirectory))
          .catch(handleTestError)
          .then(handleVersionOutput(method, releaseBranch, newVersion, packageName, changelogOptions, packageDirectory, skipGit))
          .then(handleChangelogOutput(packageDirectory, skipNpm, skipLogin))
          .then(({ code, err }) => {
            stop()
            if (code !== 0) {
              log(err)
              console.log(separator())
            } else {
              console.log(separator())
              continueReleasing()
            }
          })
      } else {
        log('RELEASE ERROR: Working directory must be clean to push release!')
      }
    }

    function continueReleasing () {
      if (packageNames !== 0) {
        release(packageNames.shift())
      } else if (packageNames.length === 0) {
        log('\n All releases complete!\n')
      }
    }

    if (packageNames.length > 0) {
      continueReleasing()
    }
  })
}

function execute (packageDirectory, ...commands) {
  function _exec (cmd) {
    const { code, stderr, stdout } = execSync(cmd, { silent: true, cwd: packageDirectory })
    if (code === 0 && commands.length > 0) {
      const _cmd = commands.shift()
      return _exec(_cmd)
    } else if (commands.length === 0) {
      return { code, err: stderr, out: stdout }
    }
    if (code !== 0) {
      log('\n' + stderr + '\n')
    }
  }

  return _exec(commands.shift())
}

function handleTestOutput (method, packageName, newVersion, packageDirectory) {
  return function ({ code, out, err }) {
    if (code === 0) {
      stop()
      log(out)
      log('    Running npm version')
      start()
      const args = [
        'version',
        '--no-git-tag-version',
        method,
        '-m',
        `'release(${packageName}): ${newVersion} [ci skip]'`
      ]
      return exec(`npm`, args, { stdio: 'inherit', cwd: packageDirectory })
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

function handleVersionOutput (method, releaseBranch, newVersion, packageName,
                              options, packageDirectory, skipGit) {
  return function ({code, out, err}) {
    stop()
    if (code === 0) {
      log(out)
      log('    Generating Changelog')
      start()
      return generateChangelog(options).then((file) => {
        if (!skipGit) {
          return execute(packageDirectory,
            'git add .',
            `git commit -m "chore(release): ${newVersion} [ci skip]"`,
            `git tag -f ${newVersion}-${packageName}`,
            `git push origin ${releaseBranch}`,
            'git push origin --tags'
          )
        }
        return Promise.resolve({ code: 0, out: 'skipping git commands', err: '' })
      })
    } else {
      log('\n')
      log(`npm version ${method} has failed: \n`)
      log()
      log(err)
      log()
      throw err
    }
  }
}

function handleChangelogOutput (packageDirectory, skipNpm, skipLogin) {
  return function ({ code, out, err }) {
    stop()
    if (code === 0) {
      log('\n    Publishing your package')
      start()
      if (skipNpm) {
        return Promise.resolve({ code: 0, err: '', out: '' })
      }

      if (skipLogin) {
        return exec('npm', ['publish'], { stdio: 'inherit', cwd: packageDirectory })
      }

      return exec('npm', ['login'], {stdio: 'inherit', cwd: packageDirectory})
        .then(({ code }) => {
          if (code === 0) return exec('npm', ['publish'], { stdio: 'inherit', cwd: packageDirectory })
          else {
            log('Login has failed')
          }
        })
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
