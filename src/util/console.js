import 'colors'
import { start, stop, change_sequence as changeSeq } from 'simple-spinner'

changeSeq(['    ', '.   ', '..  ', '... ', '....', ' ...', '  ..', '   .'])

export { start as startSpinner, stop as stopSpinner }

export function log (progress, ...args) {
  if (progress) {
    if (typeof progress === 'string') {
      return process.stdout.write(`${[progress].concat(args || []).map(modOutput).join(' ')}\n`, { encoding: 'UTF-8' })
    } else if (progress === true) {
      process.stdout.write(`${args.map(modOutput).join(' ')}`, { encoding: 'UTF-8' })
      start()
    }
    return
  }
  process.stdout.write('\n', { encoding: 'UTF-8' })
}

/**
 *  add 4 spaces to all lines
 */
export function modOutput (output) {
  return output.replace('\n', '\n    ').replace('\r', '\r    ')
}

/**
 * returns 80 character wide string used to log a separation between
 * outputs
 */
export function separator (packageName) {
  let length = typeof packageName === 'string'
    ? Math.round((76 - packageName.length) / 2)
    : 76 / 2

  if (packageName && packageName.length % 2 !== 0) {
    length = length - 1
  }

  const arr = Array(length)
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = '-'
  }
  const dashes = arr.join('')

  let output = packageName && packageName.length % 2 === 0 && packageName ||
               packageName && packageName + '-' || ''

  return (`\n##` + `${dashes}`.white + `${output}` + `${dashes}`.white + `##\n`)
}

/**
 * clears the console
 */
export function clear () {
  console.log('\x1Bc')
}
