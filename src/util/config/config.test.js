import { describe, it } from 'mocha'
import assert from 'power-assert'

import { getConfig } from './config'

describe('util.config.config', () => {
  describe('getConfig', () => {
    it('should find the closest northbrook configuration file', () => {
      const { config } = getConfig()

      assert(typeof config === 'object')
    })
  })
})
