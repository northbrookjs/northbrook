import { spawn } from 'child_process'
import { stop } from 'simple-spinner'
import { exec as cmd, cd } from 'shelljs'

const defaultOptions = {
  stdio: 'inherit',
  env: Object.create(process.env),
  cwd: process.env.NORTHBROOK_EXEC_DIR || process.cwd(),
  detached: true
}

/**
 * executes a command asynchronously that shares the stdin and stdout
 */
export function exec (command, args, _options = defaultOptions) {
  const options = Object.assign({}, defaultOptions, _options)
  return new Promise((resolve) => {
    if (options && options.start) {
      process.stdout.write(options.start)
    }

    process.nextTick(() => {
      const child = spawn(command, args, options)

      child.on('close', (code) => {
        stop()
        if (options && options.stop) {
          process.stdout.write(options.stop)
        }
        resolve({
          code, out: '', err: ''
        })
      })
    })
  })
}

const defaultPOptions = Object.assign({}, defaultOptions, { stdio: 'pipe', silent: true })

/**
 * execute a command asynchronously without sharing stdin and stdiout
 * @type {Object}
 */
export function execp (command, _options = defaultPOptions) {
  const options = Object.assign({}, defaultPOptions, _options)
  return new Promise((resolve, reject) => {
    cmd(command, options, function (code, out, err) {
      resolve({ code, err, out })
    })
  })
}

/**
 *  change the current directory
 */
export function chdir (path) {
  cd(path)
}
