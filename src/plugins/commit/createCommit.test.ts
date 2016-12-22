import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';
import { createCommit } from './createCommit';
import { CommitAnswers, generateCommit } from './questions';

const answers: CommitAnswers =
  {
    type: 'feat',
    scope: 'northbrook',
    subject: 'the best ever',
    body: '',
    affects: 'northbrook',
    breaking: 'no',
    breakingChange: '',
    issues: '',
  };

const commitMessage: string =
  generateCommit(
    answers.type,
    answers.scope,
    answers.subject,
    answers.body,
    answers.affects,
    answers.breakingChange,
    answers.issues,
  );

describe('createCommit', () => {
  it('calls git commit with passed with generated Commit', (done) => {
    const io = stdio();

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      assert.strictEqual(cp.cmd, 'git');
      assert.strictEqual(cp.args[0], 'commit');
      assert.strictEqual(cp.args[1], '-m');
      assert.strictEqual(cp.args[2], commitMessage);
      done();
    });

    createCommit(answers, io, __dirname, spawn);
  });
});
