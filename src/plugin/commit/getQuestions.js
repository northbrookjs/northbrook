import { longest, rightPad } from './util'
import { buildCommit } from './buildCommit'
import { Separator } from 'inquirer'

export function getQuestions (options) {
  const types = options.types
  const scopes = options.scopes

  const length = longest(Object.keys(types)).length + 1

  const choices = Object.keys(types).map(function (key) {
    const type = types[key]
    return {
      name: rightPad(key + ':', length) + ' ' + type.description,
      value: key
    }
  })

  choices.push({ name: rightPad('WIP:', length) + ' A Work In Progress', value: 'WIP' })

  return [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of change that you\'re committing:',
      choices: choices
    }, {
      type: 'list',
      name: 'scope',
      message: 'Select the package this change affects:\n',
      choices: scopes.concat([
        new Separator(),
        { name: 'META - Overall monorepo', value: 'META' },
        { name: 'empty = No Scope', value: false },
        { name: 'custom - Allows writing a scope', value: 'custom' }
      ])
    }, {
      type: 'input',
      name: 'scope',
      message: 'Denote the SCOPE of this change:',
      when: function (answers) {
        return answers.scope === 'custom'
      },
      validate: function (value) {
        return !!value
      }
    }, {
      type: 'input',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change:\n',
      validate: function (value) {
        return !!value
      }
    }, {
      type: 'input',
      name: 'body',
      message: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n'
    }, {
      type: 'expand',
      name: 'breaking',
      choices: [
        { key: 'n', name: 'No', value: 'no' },
        { key: 'y', name: 'Yes', value: 'yes' }
      ],
      when: function (answers) {
        return answers.type === 'fix' || answers.type === 'feat'
      },
      message: function (answers) {
        return 'Does this commit introduce BREAKING CHANGES?'
      },
      validate: function (value) {
        return !!value
      }
    },
    {
      type: 'input',
      name: 'breakingChange',
      message: 'Provide a description of the breaking changes. Use "|" to break new line:\n',
      when: answers => answers.breaking === 'yes'
    },
    {
      type: 'input',
      name: 'footer',
      message: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
      when: answers => answers.type !== 'WIP'
    },
    {
      type: 'expand',
      name: 'confirmCommit',
      choices: [
        { key: 'n', name: 'Abort commit', value: 'no' },
        { key: 'y', name: 'Yes', value: 'yes' }
      ],
      message: function (answers) {
        const SEP = '###--------------------------------------------------------###'
        console.info('\n' + SEP + '\n' + buildCommit(answers) + '\n' + SEP + '\n')
        return 'Are you sure you want to proceed with the commit above?'
      },
      validate: function (value) {
        return !!value
      }
    }
  ]
}
