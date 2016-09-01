import { join } from 'path'
import { types } from '@northbrook/commit-types'
import { prompt } from 'inquirer'

import { isInitialized, exec, execp, clear, filterScopes, log } from '../../util'

import { getQuestions } from './getQuestions'
import { buildCommit } from './buildCommit'

export const plugin = function commit (program, config, directory) {
  program.command('commit [gitArgs...]')
    .description('Powerful git commit messages')
    .action((gitArgs) => action(config, directory, gitArgs))
}

function action (config, directory, gitArgs) {
  isInitialized(config)
  execp('git commit --dry-run').then(({code, out, err}) => {
    if (code === 0) {
      clear()
      return askQuestions(config, directory).then(handleAnswers(gitArgs))
    } else {
      if (out.indexOf('nothing added to commit') > -1 || out.indexOf('Changes not staged for commit') > -1) {
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
  const args = gitArgs.length > 0
    ? ['commit'].concat(gitArgs).concat(['-m', `${commitMsg}`])
    : ['commit', '-m', `${commitMsg}`]

  return exec('git', args)
    .then(({ code, out }) => {
      if (code === 0) {
        log('\nSuccessfully built commit.')
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
