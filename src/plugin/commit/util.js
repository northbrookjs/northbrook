exports.longest = longest
exports.wrap = wrap
exports.rightPad = rightPad

function longest (arr) {
  if (!arr) {
    return null
  }

  const len = arr.length
  if (!len) {
    return null
  }

  let c = 0
  let i = 0
  let ele
  let elen
  let res

  for (; i < len; i++) {
    ele = arr[i].toString()
    elen = ele.length

    if (elen > c) {
      res = ele
      c = elen
    }
  }

  return res
}

function wrap (str, options) {
  options = options || {}
  if (str == null) {
    return str
  }

  let width = options.width || 50
  let indent = (typeof options.indent === 'string')
    ? options.indent
    : '  '

  let newline = options.newline || '\n' + indent

  function identity (str) {
    return str
  }

  let escape = typeof options.escape === 'function'
    ? options.escape
    : identity

  let re = new RegExp('.{1,' + width + '}(\\s+|$)|\\S+?(\\s+|$)', 'g')

  if (options.cut) {
    re = new RegExp('.{1,' + width + '}', 'g')
  }

  let lines = str.match(re) || []
  let res = indent + lines.map(escape).join(newline)

  if (options.trim === true) {
    res = res.replace(/[ \t]*$/gm, '')
  }
  return res
}

function rightPad (_string, _length, _char) {
  if (typeof _string !== 'string') {
    throw new Error('The string parameter must be a string.')
  }
  if (_string.length < 1) {
    throw new Error('The string parameter must be 1 character or longer.')
  }
  if (typeof _length !== 'number') {
    throw new Error('The length parameter must be a number.')
  }
  if (typeof _char !== 'string' && _char) {
    throw new Error('The character parameter must be a string.')
  }

  let i = -1
  _length = _length - _string.length
  if (!_char && _char !== 0) {
    _char = ' '
  }
  while (++i < _length) {
    _string += _char
  }

  return _string
}
