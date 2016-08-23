import { describe, it } from 'mocha'
import assert from 'power-assert'
import sinon from 'sinon'

import { action } from './exec'
import { getConfig } from '../util'

describe('Exec Plugin Action', function () {
  it('should run a command in each package', function () {
    const { config, directory } = getConfig()
    const command = ['npm', 'version']
    const options = { parent: {} }

    // supress output
    const sandbox = sinon.sandbox.create()
    sandbox.stub(console, 'log', () => {})

    return action(config, directory, command, options)
      .then(([output]) => {
        assert(output.cmd === 'npm version')
        sandbox.restore()
      })
  })
})
