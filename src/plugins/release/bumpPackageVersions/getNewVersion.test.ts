import { strictEqual } from 'assert';
import { getNewVersion } from './getNewVersion';

describe('getNewVersion', () => {
  it('bumps version semanticly', () => {
    const version = ['0', '7', '7'];

    strictEqual(getNewVersion(version, 0), 'v0.7.7');
    strictEqual(getNewVersion(version, 1), 'v0.7.8');
    strictEqual(getNewVersion(version, 2), 'v0.8.0');
    strictEqual(getNewVersion(version, 3), 'v1.0.0');
    strictEqual(getNewVersion(version, 4), 'v0.7.7');
  });
});
