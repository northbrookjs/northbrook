import { wrap } from './util'

export function buildCommit (answers) {
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

  if (result === head) {
    result += '\n'
  }

  return escapeSpecialChars(result)
}
