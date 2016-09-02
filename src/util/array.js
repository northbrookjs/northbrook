// user-land array functions for perf
// tested by testing all of the above functions

export function forEach (arr, fn) {
  const l = arr.length
  for (let i = 0; i < l; ++i) {
    fn(arr[i], i)
  }
}

export function map (arr, fn) {
  const newArr = []
  forEach(arr, (x, i) => { newArr[i] = fn(x, i) })
  return newArr
}

export function reduce (arr, seed, fn) {
  let r = seed

  forEach(arr, (x) => {
    r = fn(r, x)
  })

  return r
}

export function filter (arr, predicate) {
  const newArr = []

  forEach(arr, (x, i) => {
    if (predicate(x, i)) {
      newArr[newArr.length] = x
    }
  })

  return newArr
}
