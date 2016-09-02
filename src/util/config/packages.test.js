import { describe, it } from 'mocha'
import assert from 'power-assert'

import { resolvePackages } from './packages'

describe('util.config.plugins', () => {
  describe('resolvePackages', () => {
    it('should find all packages in a directory', () => {
      const packages = ['.']
      const config = { packages }

      assert.deepEqual(packages, resolvePackages(config, __dirname))
    })

    it('should resolve wildcard packages')
  })
})
