import { mergeWith, is, concat } from 'ramda';

export function deepMerge<U, V>(u: U, v: V): U & V {
  return mergeWith(deepMerger, u, v);
}

function deepMerger(x: any, y: any) {
  return Array.isArray(x) && Array.isArray(y)
      ? concat(x, y)
      : is(Object, x) && is(Object, y)
        ? deepMerge(x, y)
        : y;
}
