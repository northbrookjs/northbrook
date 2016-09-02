import { describe, it } from 'mocha'
import assert from 'power-assert'

import { execp } from '../../src/util/shell'

describe('util.shell', () => {
  describe('execp', () => {
    it('should return object about comamnd', () => {
      return execp('echo "hello"').then(({ code, out, err }) => {
        assert(code === 0)
        assert(out === 'hello\n')
      })
    })
  })
})
