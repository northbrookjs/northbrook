import { strictEqual } from 'assert';
import { getNewVersion } from './getNewVersion';

describe('getNewVersion', () => {
  it('bumps version semanticly', () => {
    const version = ['0', '7', '7'];

    strictEqual(getNewVersion(version, 0), '0.7.7');
    strictEqual(getNewVersion(version, 1), '0.7.8');
    strictEqual(getNewVersion(version, 2), '0.8.0');
    strictEqual(getNewVersion(version, 3), '1.0.0');
    strictEqual(getNewVersion(version, 4), '0.7.7');
  });
});
