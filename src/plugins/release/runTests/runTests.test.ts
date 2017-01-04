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

    runTests(directory, {}, io, spawn);
  });

  it('skips tests with skipTests options', () => {
    const directory = __dirname;
    const io = stdio();

    let called = 0;

    const spawn = mockSpawn(() => {
      ++called;
    });

    return runTests(directory, { skipTests: true }, io, spawn).then(() => {
      assert.strictEqual(called, 0);
    });
  });
});
