import { describe, it } from 'mocha'
import assert from 'power-assert'
import sinon from 'sinon'

import { forEach, map, reduce, filter } from '../../src/util/array'

describe('util.array', () => {
  describe('forEach', () => {
    it('should run a function for each item in an array', () => {
      const arr = [1, 2, 3, 4]
      const spy = sinon.spy()

      forEach(arr, spy)

      assert(spy.callCount === 4)
    })
  })

  describe('map', () => {
    it('should map an array to new values', () => {
      const f = x => x + 1
      const arr = [1, 2, 3, 4]
      const expected = [2, 3, 4, 5]

      assert.deepEqual(map(arr, f), expected)
    })
  })

  describe('reduce', () => {
    it('reduce(f, x, []) === x', () => {
      const x = {}
      assert.strictEqual(reduce([], x, () => {}), x)
    })

    it('reduce(append, [], a) === a', () => {
      const a = [1, 2, 3]
      const b = reduce(a, [], (b, x) => b.concat(x), [])
      assert(a !== b)
      assert.deepEqual(a, b)
    })
  })

  describe('filter', () => {
    it('should remove values that do not match predicate', () => {
      const f = x => x % 2 === 0
      const arr = [1, 2, 3, 4]
      const expected = [2, 4]

      assert.deepEqual(filter(arr, f), expected)
    })
  })
})
