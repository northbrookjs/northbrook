import { describe, it } from 'mocha'
import { join } from 'path'
import assert from 'power-assert'

import {
  filterScopes,
  getConfig,
  splitVersion,
  exists,
  isDirectory,
  isFile,
  isLink,
  getAllInDirectory,
  resolvePackages,
  separator,
  isPlugin,
  tryRequirePlugin,
  pluck,
  filterDefaultPlugins,
  resolvePlugins,
  modOutput
} from './util'

describe('util', () => {
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

  describe('getConfig', () => {
    it('should find the closest northbrook configuration file', () => {
      const { config } = getConfig()

      assert(typeof config === 'object')
      assert(Array.isArray(config.packages))
      assert.deepEqual(config.packages, ['.'])
    })
  })

  describe('exists', () => {
    it('should test if a file exists', () => {
      const validPath = join(__dirname, 'util.js')
      const invalidPath = join(__dirname, 'path-to-nowhere.js')

      assert(exists(validPath))
      assert(!exists(invalidPath))
    })
  })

  describe('isDirectory', () => {
    it('should test if a path is a directory', () => {
      const dir = __dirname
      const file = join(__dirname, 'util.js')

      assert(isDirectory(dir))
      assert(!isDirectory(file))
    })
  })

  describe('isFile', () => {
    it('should test if a path is a file', () => {
      const dir = __dirname
      const file = join(__dirname, 'util.js')

      assert(!isFile(dir))
      assert(isFile(file))
    })
  })

  describe('isLink', () => {
    it('should test if a path is a symbolic link', () => {
      // no way to reliably test if a specific path is a symbolic link
      // so test that it returns false on a path that is **not** a symbolic link
      assert(!isLink(__dirname))
    })
  })

  describe('getAllInDirectory', () => {
    it('should find all files in a directory', () => {
      const files = getAllInDirectory(__dirname)

      const expected = [
        'api.js',
        'api.test.js',
        'util.js',
        'util.test.js'
      ]

      assert.deepEqual(files, expected)
    })
  })

  describe('resolvePackages', () => {
    it('should find all packages in a directory', () => {
      const packages = ['.']
      const config = { packages }

      assert.deepEqual(packages, resolvePackages(config, __dirname))
    })

    it('should resolve wildcard packages')
  })

  describe('separator', () => {
    it('should return an 80 character wide separator', () => {
      const expected = '\n##--------------------------------------' +
        '--------------------------------------##\n'
      assert(expected === separator())

      // use 82 because of new line characters (\n)
      assert(separator().length === 82)
    })

    it('should return an 80 character wide separator with text in middle', () => {
      const expected = '\n##-----------------------------------na' +
        'med------------------------------------##\n'

      assert(expected === separator('named'))
      assert(separator().length === 82)
    })
  })

  describe('isPlugin', () => {
    it('should return true if is a plugin', () => {
      assert(isPlugin({ plugin: () => { return void 0 } }))
    })

    it('should return false if not given a plugin', () => {
      assert(!isPlugin(null))
    })
  })

  describe('tryRequirePlugin', () => {
    // TODO: add tests when we have plugins to test
    it('should return a plugin function if it is a plugin', () => {
      const plugin = tryRequirePlugin('./plugin/exec').plugin
      assert(typeof plugin === 'function')
    })
    it('should return {plugin: false} if it is not a plugin', () => {
      const { plugin } = tryRequirePlugin('path')
      assert(plugin === false)
    })
    it('should return {plugin: null} if it is not require()-able', () => {
      const { plugin } = tryRequirePlugin('something-that-is-definitely-not-a-plugin')
      assert(plugin === null)
    })
  })

  describe('pluck', () => {
    it('should return value from obj', () => {
      assert(pluck(['x'], {x: true}))
    })

    it('should return deep properties', () => {
      const obj = { x: { y: { z: true } } }

      assert(pluck(['x', 'y', 'z'], obj))
    })
  })

  describe('filterDefaultPlugins', () => {
    it('should return default plugins with no ignoreDefaults defined', () => {
      const defaults = [ function test () { return void 0 } ]
      const plugins = filterDefaultPlugins({}, defaults)
      assert.deepEqual(plugins, defaults)
    })

    it('should filter plugins by function name', () => {
      function test () {}
      function filter () {}
      const config = {
        ignoreDefaults: ['filter']
      }
      const defaults = [test, filter]
      const plugins = filterDefaultPlugins(config, defaults)

      assert(plugins.length === 1)
    })
  })

  describe('resolvePlugins', () => {
    it('should resolve plugins', () => {
      const config = {
        plugins: ['./plugin/exec', './plugin/commit']
      }

      const plugins = resolvePlugins(config, __dirname)

      assert(plugins.length === 2)
    })
    it('should return empty array if none are found', () => {
      const config = {
        plugins: ['path', 'fs'] // not plugins
      }
      const plugins = resolvePlugins(config, __dirname)

      assert(plugins.length === 0)
    })
  })

  describe('resolveExtends', () => {
    it('should resolve extends configurations')
  })

  describe('modOutput', () => {
    it('should shift a string over 4 spaces', () => {
      const str = 'hi'
      const expected = '    ' + str
      assert(modOutput(str) === expected)
    })

    it('should shift all lines over 4 spaces', () => {
      const str = 'hello\nworld'
      const expected = '    hello\n    world'
      assert(modOutput(str) === expected)
    })
  })
})
