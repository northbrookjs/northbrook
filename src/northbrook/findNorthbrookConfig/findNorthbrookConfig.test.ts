import * as assert from 'assert';
import { dirname, join } from 'path';
import { stdio } from 'stdio-mock';
import { findNorthbrookConfig } from './findNorthbrookConfig';

describe('findNorthbrookConfig', () => {
  // @TODO: write a test for this that creates a file somewhere to look for it
  it('should return a required() version of a northbrook config', () => {
    const cwd = join(__dirname, '__test__');

    const { path, config } =
      findNorthbrookConfig(false, stdio(), { cwd, case: false });

    assert.strictEqual(typeof path, 'string');
    assert.strictEqual(typeof config, 'object');

    assert.strictEqual(config && Array.isArray(config.packages), true);
  });

  it('returns null if it can not find a northbrook config', () => {
    const { path, config } =
      findNorthbrookConfig(false, stdio(), { cwd: dirname(process.env.HOME) });

    assert.strictEqual(path, null);
    assert.strictEqual(config, null);
  });
});
