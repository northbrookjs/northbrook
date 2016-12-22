import * as assert from 'assert';
import { deepMerge } from './deepMerge';

describe('deepMerge', () => {
  it('merges 2 objects', () => {
    const a = { a: 1 };
    const b = { b: 2 };

    const c = deepMerge(a, b);

    assert.strictEqual(c.a, 1);
    assert.strictEqual(c.b, 2);
  });

  it('merges nested objects', () => {
    const a = {
      a: {
        a: 1,
      },
    };

    const b = {
      a: {
        b: 2,
      },
    };

    const c = deepMerge(a, b);

    assert.strictEqual(c.a.a, 1);
    assert.strictEqual(c.a.b, 2);
  });

  it('concats arrays', () => {
    const a = {
      a: [1],
    };

    const b = {
      a: [2],
    };

    const c = deepMerge(a, b);

    assert.deepEqual(c.a, [1, 2]);
  });

  it('replaces other values', () => {
    const a = {
      a: [1],
      b: 3,
    };

    const b = {
      a: [2],
      b: 1,
    };

    const c = deepMerge(a, b);

    assert.strictEqual(c.b, 1);
  });
});
