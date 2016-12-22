import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';

import { checkForStagedChanges } from './checkForStagedCommits';

describe('checkForStagedChanges', () => {
  it('calls git commit --dry-run', (done) => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      assert.strictEqual(cp.cmd, 'git');
      assert.strictEqual(cp.args[0], 'commit');
      assert.strictEqual(cp.args[1], '--dry-run');
      done();
    });

    checkForStagedChanges(io, __dirname, spawn);
  });

  it('returns promise of true on success', () => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      cp.end();
    });

    checkForStagedChanges(io, __dirname, spawn).then(assert.ok);
  });

  it('returns useful error message', () => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      cp.stdout.write('nothing added to commit');
      cp.emit('error');
    });

    return checkForStagedChanges(io, __dirname, spawn).catch(err => {
      assert.strictEqual(err, 'nothing added to commit');
    });
  });

  it('returns useful error message', () => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      cp.stdout.write('Changes not staged for commit');
      cp.emit('error');
    });

    return checkForStagedChanges(io, __dirname, spawn).catch(err => {
      assert.strictEqual(err, 'Changes not staged for commit');
    });
  });

  it('returns error message', () => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      cp.stdout.write('asdf');
      cp.stderr.write('malfunction');
      cp.emit('error');
    });

    return checkForStagedChanges(io, __dirname, spawn).catch(err => {
      assert.strictEqual(err, 'malfunction');
    });
  });
});
