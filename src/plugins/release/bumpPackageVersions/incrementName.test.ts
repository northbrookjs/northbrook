import * as assert from 'assert';
import { incrementName } from './incrementName';

describe('incrementName', () => {
  assert.strictEqual(incrementName(0), false);
  assert.strictEqual(incrementName(1), 'patch');
  assert.strictEqual(incrementName(2), 'minor');
  assert.strictEqual(incrementName(3), 'major');
  assert.strictEqual(incrementName(4), false);
});
