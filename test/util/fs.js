import { describe, it } from 'mocha'
import assert from 'power-assert'
import { join } from 'path'

import { exists, isDirectory, isFile, isLink, getAllInDirectory } from '../../src/util/fs'

describe('util.fs', () => {
  describe('exists', () => {
    it('should test if a file exists', () => {
      const validPath = join(__dirname, 'fs.js')
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
      const file = join(__dirname, 'fs.js')

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
        'array.js',
        'array.test.js',
        'console.js',
        'console.test.js',
        'fs.js',
        'fs.test.js',
        'index.js',
        'object.js',
        'object.test.js',
        'packages.js',
        'packages.test.js',
        'shell.js',
        'shell.test.js'
      ]

      assert.deepEqual(files, expected)
    })
  })
})
