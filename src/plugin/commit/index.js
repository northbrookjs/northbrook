import { join } from 'path'
import { types } from 'conventional-commit-types'
import { prompt } from 'inquirer'

import { isInitialized, exec, clear } from '../../util'

import { getQuestions } from './getQuestions'
import { buildCommit } from './buildCommit'

export const plugin = function commit (program, config, directory) {
  program.command('commit [gitArgs...]')
    .description('Powerful git commit messages')
    .action((gitArgs) => action(config, directory, gitArgs))
}

function action (config, directory, gitArgs) {
  isInitialized(config)
  exec('git commit --dry-run').then(({code, out, err}) => {
    if (code === 0) {
      clear()
      return askQuestions(config, directory).then(handleAnswers(gitArgs.join(' ')))
    } else {
      if (out.indexOf('nothing added to commit') > -1) {
        console.log('\n\nNo files are added to commit.')
        console.log()
        console.log('Did you forget git to run `git add`?\n')
      } else {
        console.log(err)
      }
    }
  })
}

export function askQuestions (config, directory) {
  const scopes = getScopes(config, directory)
  const questions = getQuestions({ scopes, types })

  return prompt(questions)
}

export function handleAnswers (gitArgs) {
  return function (answers) {
    if (answers.confirmCommit === 'yes') {
      return commit(buildCommit(answers), gitArgs)
    } else {
      return console.info('Commit has been canceled.')
    }
  }
}

function commit (commitMsg, gitArgs) {
  return exec(`git commit ${gitArgs} -m '${commitMsg}'`)
    .then(({ code, out }) => {
      if (code === 0) {
        console.log('successfull built commit')
      } else {
        console.log(out)
      }
    })
}

function packageToScopeName (packageName, workingDir) {
  const scope = require(join(workingDir, packageName, 'package.json')).name
  return { name: scope, value: packageName === '.' ? scope : packageName }
}

function getScopes (config, workingDir) {
  const packages = config.packages
  return packages.map(name => packageToScopeName(name, workingDir))
}
