import { describe, it } from 'mocha'
import assert from 'power-assert'

import { resolvePackages } from '../../../src/util/config/packages'

describe('util.config.packages', () => {
  describe('resolvePackages', () => {
    it('should find all packages in a directory', () => {
      const packages = ['.']
      const config = { packages }

      assert.deepEqual(packages, resolvePackages(config, __dirname))
    })

    it('should resolve wildcard packages')
  })
})
