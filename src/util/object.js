import { reduce } from './array'

/**
 * given a path will require that object an
 */
export function pluck (args, obj) {
  function pluckReduce (a, b) {
    if (typeof a === 'string') return b[a]
    return reduce(a, b, (obj, x) => {
      if (!obj || typeof obj !== 'object') {
        return null
      }
      return obj[x]
    })
  }

  // curry this thing
  switch (arguments.length) {
    case 1: return (b) => pluckReduce(args, b)
    case 2: return pluckReduce(args, obj)
    default: return pluckReduce(args, obj)
  }
}
