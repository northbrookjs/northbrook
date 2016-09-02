import { spawn } from 'child_process'
import { stop } from 'simple-spinner'
import { exec as cmd, cd } from 'shelljs'

/**
 * executes a command asynchronously that shares the stdin and stdout
 */
export function exec (command, args, options = { stdio: 'inherit', env: process.env, cwd: process.cwd(), detached: true }) {
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

/**
 * execute a command asynchronously without sharing stdin and stdiout
 * @type {Object}
 */
export function execp (command, options = { silent: true }) {
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
