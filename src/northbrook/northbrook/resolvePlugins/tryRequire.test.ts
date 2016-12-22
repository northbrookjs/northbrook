import * as assert from 'assert';
import { tryRequire } from './tryRequire';

describe('tryRequire', () => {
  it('should return a required package', () => {
    const Mocha = tryRequire('mocha');

    assert.notStrictEqual(Mocha, null);

    const mocha = new Mocha();

    assert.strictEqual(typeof mocha, 'object');
    assert.strictEqual(typeof mocha.addFile, 'function');
  });

  it('should return null if a package cannot be found', () => {
    const pkg = tryRequire('asddfasdfasdfasdfasdfadf');
    assert.strictEqual(pkg instanceof Error, true);
  });
});
