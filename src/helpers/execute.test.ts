import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';

import { execute } from './execute';

const command = 'git';
const args = ['commit', '--dry-run'];
const cwd = __dirname;

describe('execute', () => {
  describe('given a command with arguments, stio, a directory and spawn', () => {
    it('executes a command with given arguments', () => {
      const io = stdio();

      const spawn = mockSpawn(function (cp: MockChildProcess) {
        assert.strictEqual(cp.cmd, command);
        assert.deepEqual(cp.args, args);
        cp.end();
      });

      return execute(command, args, io, __dirname, spawn);
    });

    it('writes data to stdout', (done) => {
      const io = stdio();

      const spawn = mockSpawn(function (cp: MockChildProcess) {
        cp.stdout.write('hello');
      });

      io.stdout.on('data', (data: string) => {
        if (data.trim()) {
          assert.strictEqual(data.toString(), 'hello');
          done();
        }
      });

      execute(command, args, io, cwd, spawn);
    });

    it('writes data to stder', (done) => {
      const io = stdio();

      const spawn = mockSpawn(function (cp: MockChildProcess) {
        cp.stderr.write('hello');
      });

      io.stderr.on('data', (data: string) => {
        if (data.trim()) {
          assert.strictEqual(data.toString(), 'hello');
          done();
        }
      });

      execute(command, args, io, cwd, spawn);
    });

    it('uses inherit if using process stdio', (done) => {
      const io = {
        stderr: process.stderr,
        stdout: process.stdout,
        stdin: process.stdin,
      };

      const spawn = mockSpawn(function (cp: MockChildProcess) {
        assert.deepEqual((cp.options as any).stdio, ['inherit', 'inherit', 'inherit']);
        done();
      });

      execute(command, args, io, cwd, spawn);
    });

    it('returns a promise with message array from stdout if passes', () => {
      const io = stdio();

      const spawn = mockSpawn(function (cp: MockChildProcess) {
        cp.stdout.write('Hello');
        cp.stdout.write('World');
        setTimeout(() => cp.end());
      });

      return execute(command, args, io, cwd, spawn).then(({stdout}) => {
        assert.strictEqual(stdout, 'HelloWorld');
      });
    });

    it('returns a promise with message array from stderr if fails', () => {
      const io = stdio();

      const spawn = mockSpawn(function (cp: MockChildProcess) {
        cp.stdout.write('Hello');
        cp.stderr.write('Malfunction');
        cp.emit('error');
      });

      return execute(command, args, io, cwd, spawn).catch(({stderr}) => {
        assert.strictEqual(stderr, 'Malfunction');
      });
    });

    it('rejects a promise if child process exits with non-zero code', (done) => {
      const io = stdio();

      const spawn = mockSpawn(function (cp: MockChildProcess) {
        cp.emit('close', 1);
      });

      execute(command, args, io, cwd, spawn)
        .then(() => {
          done(new Error('Should not resolve promise'));
        })
        .catch(() => {
          done();
        });
    });
  });
});
