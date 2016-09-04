import { join } from 'path'
import { writeFileSync } from 'fs'
import fixpack from 'fixpack'
import { modifyConfig, isFile, execp } from './util'
import jsonbeautify from 'json-beautify'

const beautify = obj => jsonbeautify(obj, null, 2, 80)

const PACKAGE = join(process.cwd(), 'package.json')
const CONFIG = join(process.cwd(), 'northbrook.json')

const config = {
  ghooks: {
    'commit-msg': 'node ./node_modules/.bin/validate-commit-msg'
  },
  'validate-commit-msg': {
    types: '@northbrook/commit-types'
  }
}

const scripts = {
  commit: 'northbrook commit',
  release: 'northbrook release'
}

const defaultConfig = {
  plugins: [],
  scripts: {}
}

modifyConfig(PACKAGE, function (pkg) {
  if (!pkg) { throw new Error('package.json can not be found!') }

  const existingConfig = pkg.config || {}
  const existingScripts = pkg.scripts || {}

  return Object.assign({}, pkg, {
    config: Object.assign({}, existingConfig, config),
    scripts: Object.assign({}, existingScripts, scripts)
  })
})
.then(() => {
  fixpack(PACKAGE)
})

if (!isFile(CONFIG)) {
  execp(`touch ${CONFIG}`)
    .then(({ code, out, err }) => {
      if (code === 0) {
        writeFileSync(CONFIG, beautify(defaultConfig))
      } else {
        throw new Error('Could not create northbrook.json')
      }
    })
}
