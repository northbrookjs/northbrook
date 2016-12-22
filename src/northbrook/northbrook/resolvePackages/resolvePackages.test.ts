import * as assert from 'assert';
import { resolvePackages } from './resolvePackages';
import { stdio } from 'stdio-mock';

describe('resolvePackages', () => {
  it('returns an empty array if no packages are found', () => {
    assert.strictEqual(resolvePackages(['./'], __dirname, stdio()).length, 0);
  });

  it('returns an array of absolute paths for packages found', () => {
    const packages = resolvePackages(['__test__/**'], __dirname, stdio());

    assert.strictEqual(packages.length, 2);
  });

  it('writes warning to stdout if no packages not found', (done) => {
    const io = stdio();

    io.stdout.on('data', (data: Buffer | string) => {
      assert.ok(data.toString().indexOf('Could not resolve package:') > -1);
      done();
    });

    resolvePackages(['./__test__/c'], __dirname, io);
  });
});
