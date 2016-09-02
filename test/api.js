import { describe, it } from 'mocha'
import assert from 'power-assert'

import { setup, basicPlugin, getConfig } from '../src/api'

// simulate args as running from cli
const args = (...testArgs) =>
  (['node', './node_modules/.bin/northbrook'].concat(testArgs))

describe('api', () => {
  it('should return an object', () => {
    const config = getConfig()
    const pkg = require('../package.json')
    const {plugins, packages, version, start} = setup(config)

    assert(Array.isArray(plugins))
    assert.deepEqual(packages, ['.'])
    assert(version === pkg.version)
    assert(typeof start === 'function')
  })

  describe('start', () => {
    it('should process args to execute commands', (done) => {
      const action = (config, workgingDir, options) => {
        assert(typeof config === 'object')
        assert(typeof workgingDir === 'string')
        assert(typeof options === 'object')
        assert(options.only === 'testPackage')
        done()
      }

      const plugin = basicPlugin('test', 'tests stuff', action, true)

      const config = {
        packages: ['testPackage']
      }
      const directory = __dirname

      const defaultPlugins = [plugin]

      const { start } = setup({ config, directory, defaultPlugins })
      start(args('test', '-o', 'testPackage'))
    })
  })
})
