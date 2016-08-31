import { join } from 'path'
import { types } from '@northbrook/commit-types'
import { prompt } from 'inquirer'

import { isInitialized, exec, clear, filterScopes, log } from '../../util'

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
        log('\n\nNo files are added to commit.')
        log('\n')
        log('Did you forget git to run `git add`?\n')
      } else {
        if (out) {
          log(out)
        } else {
          log(err)
        }
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
      return console.info('\nCommit has been canceled.\n')
    }
  }
}

function commit (commitMsg, gitArgs) {
  return exec(`git commit ${gitArgs} -m '${commitMsg}'`)
    .then(({ code, out }) => {
      if (code === 0) {
        log('\nSuccessfully built commit.\n')
      } else {
        log(out)
      }
    })
}

function packageToScopeName (packageName, workingDir) {
  const name = filterScopes(require(join(workingDir, packageName, 'package.json')).name)
  return { name, value: name }
}

function getScopes (config, workingDir) {
  const packages = config.packages
  return packages.map(name => packageToScopeName(name, workingDir))
}
