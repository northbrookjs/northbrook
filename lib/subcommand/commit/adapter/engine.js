const { longest, wrap, rightPad } = require('./util')

module.exports = function (options) {
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

  choices.push({ name: rightPad('WIP:', length) + 'A Work In Progress', value: 'WIP' })

  return {
    prompter: function (cz, commit) {
      console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n')
      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
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
            new cz.Separator(),
            { name: 'META - Overall monorepo', value: 'META' },
            { name: 'empty', value: false },
            { name: 'custom', value: 'custom' }
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
          when: answers => answers.breaking === 'yes',
          validate: Boolean
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
      ]).then(function (answers) {
        if (answers.confirmCommit === 'yes') {
          commit(buildCommit(answers))
        } else {
          console.info('Commit has been canceled.')
        }
      })
    }
  }
}

function buildCommit (answers) {
  const maxLineWidth = 100

  const wrapOptions = {
    trim: true,
    newline: '\n',
    indent: '',
    width: maxLineWidth
  }

  function addScope (scope) {
    if (!scope) return ': ' // it could be type === WIP. So there is no scope

    return '(' + scope.trim() + '): '
  }

  function addSubject (subject) {
    return subject.trim()
  }

  function escapeSpecialChars (result) {
    const specialChars = ['`']

    specialChars.map(function (item) {
      // For some strange reason, we have to pass additional '\' slash to commitizen. Total slashes are 4.
      // If user types "feat: `string`", the commit preview should show "feat: `\\string\\`".
      // Don't worry. The git log will be "feat: `string`"
      result = result.replace(new RegExp(item, 'g'), '\\\\`')
    })
    return result
  }

  // Hard limit this line
  const head = (answers.type + addScope(answers.scope) + addSubject(answers.subject)).slice(0, maxLineWidth)

  // Wrap these lines at 100 characters
  const body = answers.body ? wrap(answers.body, wrapOptions).split('|').join('\n') : ''
  const breaking = answers.breaking === 'yes' ? wrap(`BREAKING CHANGE: ${answers.breakingChange}`, wrapOptions).split('|').join('\n') : ''
  const footer = wrap(answers.footer, wrapOptions)

  let result = head
  if (body) {
    result += '\n\n' + body
  }
  if (answers.breaking && answers.breaking === 'yes') {
    result += '\n\n' + breaking
  }
  if (footer) {
    result += '\n\nISSUES CLOSED: ' + footer
  }

  return escapeSpecialChars(result)
}
