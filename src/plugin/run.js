import 'colors'
import { join, delimiter } from 'path'
import { stop } from 'simple-spinner'
import { execp as exec, log } from '../util'


const flatten = l => l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

export const plugin = run

function run (program, config, workingDir) {
  program
    .command('run <scriptName> [args...]')
    .option('-s, --silent', 'Print less stuff')
    .description('Like npm scripts, but NPM installable')
    .action((scriptName, args, options) => action(config, workingDir, scriptName, args, options))
}

function action (config, workingDir, scriptName, args, options) {
  const { pre, cmd, post } = getScripts(config, scriptName, args)

  log()

  if (!cmd) {
    log('Cannot find script: '.red + scriptName)
  }

  process.env.PATH = join(workingDir, 'node_modules/.bin') + delimiter + process.env.PATH
  execute(workingDir, scriptName, pre, cmd, post, options && options.silent || false)
}

const trim = str => str.trim()
const split = str => str.split('&&')
const splitTrim = str => str ? split(str).map(trim) : null

const replaceNb = str => str.replace('northbrook run', '').replace('nb run', '').trim()

function replaceCmd (scripts, cmd) {
  const cmds = splitTrim(cmd)

  if (cmds && cmds.length > 0) {
    for (let i = 0; i < cmds.length; ++i) {
      const cmd = cmds[i]
      if (cmd.indexOf('northbrook run') === 0 || cmd.indexOf('nb run') === 0) {
        cmds[i] = replaceCmd(scripts, scripts[replaceNb(cmd)])
      }
    }

    return flatten(cmds)
  }
  return null
}

function getScripts (config, scriptName, args) {
  const scripts = config.scripts
  if (scripts) {
    const pre = scripts['pre' + scriptName] || null
    const _cmd = scripts[scriptName] || null
    const cmd = _cmd && args.length > 0 ? `${_cmd} -- ${args.join(' ')}` : _cmd
    const post = scripts['post' + scriptName] || null

    return {
      pre: replaceCmd(scripts, pre),
      cmd: replaceCmd(scripts, cmd),
      post: replaceCmd(scripts, post)
    }
  }

  return { pre: null, cmd: null, post: null }
}

let number = 0
function execute (packageDirectory, scriptName, pre, cmd, post, silent) {
  const pretext = (`northbrook run pre${scriptName}`.underline)
  const text = (`northbrook run ${scriptName}`.underline)
  const posttext = (`northbrook run post${scriptName}`.underline)

  _exec(pretext, silent, pre)
    .then(({code}) => {
      if (code === 0) {
        return _exec(text, silent, cmd)
      }
    })
    .then(({code}) => {
      if (code === 0) return _exec(posttext, silent, post)
    })
    .catch((err) => {
      log(err)
    })
    .then(() => {
      process.stdout.close()
    })
}

const toStr = x => (String(parseInt(x)) + '.').white

function _exec (out, silent, cmds) {
  if (cmds && cmds.length > 0) {
    if (!silent) {
      log(toStr(++number), ' ' + out)
    }

    let r = runCommand(silent, cmds[0].trim())

    for (let i = 1; i < cmds.length; ++i) {
      const cmd = cmds[i]
      r = r.then(({code, err}) => {
        if (code === 0) {
          return runCommand(silent, cmd)
        }
        throw err
      })
    }

    if (silent) {
      return r.then(({ code }) => {
        if (code === 0) {
          log(toStr(++number), ' ' + out, '\u2713'.green.bold)
        } else {
          log(toStr(++number), ' ' + out, '\u2718'.red)
        }
      })
    }

    return r
  }

  return Promise.resolve({ code: 0, out: '', err: '' })
}

function runCommand (silent, cmd) {
  if (cmd) {
    if (!silent) {
      stop()
      log(true, `\n-  $`.reset + ` ${cmd.replace('\n', '\\n').replace('\t', '\\t').replace('\r', '\\r')}`.white.italic)
    }
    return exec(cmd).then(logSuccess(silent))
  }

  return Promise.resolve({ code: 0, out: '', err: '' })
}

function logSuccess (silent) {
  return function ({ code, out, err }) {
    stop()
    if (!code || code === 0) {
      if (out.length > 0) {
        log((out).green)
      } else if (!silent) {
        log()
      }
    }
    if (code && code !== 0) {
      if (err) {
        log((err).red)
      } else if (out) {
        log((out).red)
      }
    }

    return arguments[0]
  }
}
