import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';
import { runTests } from './runTests';

describe('runTests', () => {
  it('runs npm test', (done) => {
    const directory = __dirname;
    const io = stdio();

    const spawn = mockSpawn((cp: MockChildProcess) => {
      assert.strictEqual(cp.cmd, 'npm');
      assert.strictEqual(cp.args.length, 1);
      assert.strictEqual(cp.args[0], 'test');
      done();
    });

    runTests(directory, io, spawn)({});
  });

  it('returns commits after running tests', () => {
    const directory = __dirname;
    const io = stdio();

    const spawn = mockSpawn((cp: MockChildProcess) => {
      assert.strictEqual(cp.cmd, 'npm');
      assert.strictEqual(cp.args.length, 1);
      assert.strictEqual(cp.args[0], 'test');
      cp.end();
    });

    const affectedPackages: any = {};

    return runTests(directory, io, spawn)(affectedPackages).then((r: any) => {
      assert.strictEqual(r, affectedPackages);
    });
  });
});
