import { describe, it } from 'mocha'
import assert from 'power-assert'

import {
  isPlugin,
  tryRequirePlugin,
  filterDefaultPlugins,
  resolvePlugins } from '../../../src/util/config/plugins'

describe('util.config.plugins', () => {
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
      const plugin = tryRequirePlugin('../../plugin/exec').plugin
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
        plugins: ['../../plugin/exec', '../../plugin/commit']
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
})
