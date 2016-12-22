import * as assert from 'assert';
import { splitVersion } from './splitVersion';

describe('splitVersion', () => {
  it('splits semantic versioned strings into array of numbers', () => {
    assert.deepEqual(splitVersion('1.2.3'), [1, 2, 3]);
    assert.deepEqual(splitVersion('2.0.0'), [2, 0, 0]);
    assert.deepEqual(splitVersion('1.x.x'), [1, 'x', 'x']);

    assert.throws(() => {
      splitVersion('1.2');
    });
  });
});
