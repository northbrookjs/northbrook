import * as assert from 'assert';
import { tryRequire } from './tryRequire';

describe('tryRequire', () => {
  it('should return a required package', () => {
    const Mocha = tryRequire('mocha', __dirname);

    assert.notStrictEqual(Mocha, null);

    const mocha = new Mocha();

    assert.strictEqual(typeof mocha, 'object');
    assert.strictEqual(typeof mocha.addFile, 'function');
  });

  it('should return null if a package cannot be found', () => {
    const pkg = tryRequire('asddfasdfasdfasdfasdfadf', __dirname);
    assert.strictEqual(pkg instanceof Error, true);
  });
});
