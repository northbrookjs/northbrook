import { describe, it } from 'mocha'
import assert from 'power-assert'

import { filterScopes, splitVersion } from '../../src/util/packages'

describe('util.packages', () => {
  describe('filterScopes', () => {
    it('should remove scoped parts of package names', () => {
      const str = '@northbrook/tslint'
      assert(filterScopes(str) === 'tslint')
    })

    it('should leave a non-scoped package name alone', () => {
      const str = 'tslint'
      assert(filterScopes(str) === 'tslint')
    })
  })

  describe('splitVersion', () => {
    it('should split a semver correct version string into 3 parts', () => {
      const [major, minor, patch] = splitVersion('1.2.3')

      assert(major === 1)
      assert(minor === 2)
      assert(patch === 3)
    })

    it('should throw if not given a proper version number', () => {
      assert.throws(() => {
        splitVersion('1.3')
      }, /1.3 passed is not a proper semantic version number/)
    })
  })
})
