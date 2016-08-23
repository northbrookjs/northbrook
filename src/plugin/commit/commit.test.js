import { describe, it } from 'mocha'
import assert from 'power-assert'

import { buildCommit } from './buildCommit'
import { getQuestions } from './getQuestions'
import { types } from 'conventional-commit-types'

const scopes = [
  {name: 'test', value: 'test'}
]

const answers = {
  type: 'feat',
  scope: 'test',
  subject: 'test commmit message',
  body: 'sample body message',
  breaking: 'yes',
  breakingChange: 'Stuff changed yo',
  footer: 'footer message'
}

describe('commit', () => {
  describe('getQuestions', () => {
    it('should return an array of inquirer questions', () => {
      const questions = getQuestions({ scopes, types })

      questions.forEach(question => {
        assert(typeof question.type === 'string')
      })
    })
  })

  describe('buildCommit', () => {
    it('should build a nice organized commit message', () => {
      const commit = buildCommit(answers)
      assert(typeof commit === 'string')
      const expected = 'feat(test): test commmit message\n\nsample body message\n\nBREAKING CHANGE: Stuff changed yo\n\nISSUES CLOSED: footer message'

      assert(commit === expected)
    })
  })
})
