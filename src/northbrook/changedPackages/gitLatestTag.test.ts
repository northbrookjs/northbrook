import * as assert from 'assert';
import { EOL } from 'os';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';
import { gitLatestTag } from './gitLatestTag';

const cwd = __dirname;

describe('gitLatestTag', () => {
  it('executes git log', (done) => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      assert.strictEqual(cp.cmd, 'git');
      assert.strictEqual(cp.args[0], 'log');
      done();
    });

    gitLatestTag(cwd, io, spawn);
  });

  it('returns a promise of the latest tag', () => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      assert.strictEqual(cp.cmd, 'git');
      assert.strictEqual(cp.args[0], 'log');

      cp.stdout.write('commit 7d7a7d (tag: v1.2.3)' + EOL);
      cp.stdout.write('commit 7d7a7d (tag: v1.0.0)' + EOL);
      cp.stdout.write('commit 7d7a7d (tag: v0.4.0)' + EOL);
      cp.stdout.write('commit 7d7a7d (tag: v0.3.0)' + EOL);
      cp.stdout.write('commit 7d7a7d (tag: v0.2.0)' + EOL);

      cp.end();
    });

    return gitLatestTag(cwd, io, spawn).then(tag => {
      assert.strictEqual(tag, 'v1.2.3');
    });
  });

  it('rejects if cannot find any matching tags', () => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      cp.end();
    });

    return gitLatestTag(cwd, io, spawn).catch(err => {
      assert.strictEqual(err.message, 'Failed to find any tags');
    });
  });
});
