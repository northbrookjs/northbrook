import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';
import { switchToReleaseBranch } from './switchToReleaseBranch';

describe('switchToReleaseBranch', () => {
  it('calls `git checkout` "releaseBranch"', (done) => {
    const releaseBranch = 'hello';
    const io = stdio();
    const cwd = __dirname;

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      assert.strictEqual(cp.cmd, 'git');
      assert.strictEqual(cp.args.length, 2);
      assert.strictEqual(cp.args[0], 'checkout');
      assert.strictEqual(cp.args[1], releaseBranch);
      done();
    });

    switchToReleaseBranch(releaseBranch, io, cwd, spawn);
  });
});
