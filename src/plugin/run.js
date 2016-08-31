import 'colors'
import { join, delimiter } from 'path'
import { start, stop, change_sequence as changeSeq } from 'simple-spinner'
import { exec, clear, separator, log } from '../util'

changeSeq(['    ', '.   ', '..  ', '... ', '....', ' ...', '  ..', '   .'])

const flatten = l => l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

export const plugin = run

function run (program, config, workingDir) {
  program
    .command('run <scriptName> [args...]')
    .option('-v, --verbose', 'Prints extra information to the console')
    .description('Like npm scripts, but NPM installable')
    .action((scriptName, args, options) => action(config, workingDir, scriptName, args, options))
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

function action (config, workingDir, scriptName, args, options) {
  clear()

  const { pre, cmd, post } = getScripts(config, scriptName, args)

  console.log(separator())
  log()

  if (!cmd) {
    log('Cannot find script: '.red + scriptName)
    return console.log(separator() + '\n')
  }

  process.env.PATH = join(workingDir, 'node_modules/.bin') + delimiter + process.env.PATH
  execute(workingDir, scriptName, pre, cmd, post, options && options.verbose)
}

let number = 0
function execute (packageDirectory, scriptName, pre, cmd, post, verbose) {
  const pretext = (`northbrook run pre${scriptName}`.underline)
  const text = (`northbrook run ${scriptName}`.underline)
  const posttext = (`northbrook run post${scriptName}`.underline)

  _exec(pretext, verbose, pre)
    .then(({code}) => {
      if (code === 0) {
        return _exec(text, verbose, cmd)
      }
    })
    .then(({code}) => {
      if (code === 0) return _exec(posttext, verbose, post)
    })
    .then(() => {
      console.log(separator())
    })
    .catch((err) => {
      console.log(err)
      console.log(separator())
    })
}

const toStr = x => (String(parseInt(x)) + '.').white

function _exec (out, verbose, cmds) {
  if (cmds && cmds.length > 0) {
    process.stdout.write(toStr(++number))
    process.stdout.write('  ' + out)

    let r = runCommand(verbose, cmds[0].trim())

    for (let i = 1; i < cmds.length; ++i) {
      const cmd = cmds[i]
      r = r.then(({code, err}) => {
        if (code === 0) {
          return runCommand(verbose, cmd)
        }
        throw err
      })
    }
    return r
  }

  return Promise.resolve({ code: 0, out: '', err: '' })
}

function runCommand (verbose, cmd) {
  if (cmd) {
    if (verbose) {
      stop()
      process.stdout.write(`\n\n-  $`.reset + ` ${cmd.replace('\n', '\\n').replace('\t', '\\t').replace('\r', '\\r')}`.white.italic)
      start()
    }
    return exec(cmd).then(logSuccess(verbose))
  }

  return Promise.resolve({ code: 0, out: '', err: '' })
}

function logSuccess (verbose) {
  return function ({ code, out, err }) {
    stop()
    if (!code || code === 0) {
      if (!verbose) { log(); log() }
      if (out) {
        log((out).green)
      }
    }
    if (code && code !== 0) {
      if (!verbose) { log(); log() }
      if (err) {
        log((err).red)
      } else if (out) {
        log((out).red)
      }
    }

    return arguments[0]
  }
}
