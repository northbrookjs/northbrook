import { describe, it } from 'mocha'
import assert from 'power-assert'

import { pluck } from '../../src/util/object'

describe('util.object', () => {
  describe('pluck', () => {
    it('should return value from obj', () => {
      assert(pluck(['x'], {x: true}))
    })

    it('should return deep properties', () => {
      const obj = { x: { y: { z: true } } }

      assert(pluck(['x', 'y', 'z'], obj))
    })
  })
})
