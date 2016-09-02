import { describe, it } from 'mocha'
import assert from 'power-assert'

import { separator, modOutput } from './console'

describe('util.console', () => {
  describe('separator', () => {
    function strip (string) {
      return string.replace(/[\u001b][[0-9]+m/g, '')
    }

    it('should return an 80 character wide separator', () => {
      const expected = '\n##--------------------------------------' +
        '--------------------------------------##\n'
      assert(expected === strip(separator()))

      // use 82 because of new line characters (\n)
      assert(strip(separator()).length === 82)
    })

    it('should return an 80 character wide separator with text in middle', () => {
      const expected = '\n##-----------------------------------na' +
        'med------------------------------------##\n'

      assert(expected === strip(separator('named')))
      assert(strip(separator()).length === 82)
    })
  })

  describe('modOutput', () => {
    it('should shift a string over 4 spaces', () => {
      const str = 'hi'
      const expected = str
      assert(modOutput(str) === expected)
    })

    it('should shift all lines over 4 spaces', () => {
      const str = 'hello\nworld'
      const expected = 'hello\n    world'
      assert(modOutput(str) === expected)
    })
  })
})
