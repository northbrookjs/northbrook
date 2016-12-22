export function longest(list: Array<string>) {
  const length = list.length;

  let longestString = '';
  let longestStringLength = 0;

  for (let i = 0; i < length; ++i) {
    const str = list[i].toString();

    if (str.length > longestStringLength) {
      longestStringLength = str.length;
      longestString = str;
    }
  }

  return longestString;
}

export function rightPad(str: string, length: number, character = ' ') {
  for (let i = 0; i < length; ++i) {
    str = str + character;
  }

  return str;
}