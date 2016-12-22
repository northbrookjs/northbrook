import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';
import { gitRawCommits, separator } from './gitRawCommits';

const logMessage =
`520eae83fcfd2da9cea3c0d336edd01258385e78${separator}` +
`520eae8${separator}` +
`Tylor Steinberger${separator}` +
`tlsteinberger167@gmail.com${separator}` +
`1474495175${separator}` +
`chore(release): v3.2.1 [ci skip]${separator}` +
`a5cf5fc7ec139bfa21c89774963af251828af8a2${separator}` +
`a5cf5fc${separator}` +
`Tylor Steinberger${separator}` +
`tlsteinberger167@gmail.com${separator}` +
`1474495060${separator}` +
`fix(northbrook): fix exec plugin\nAFFECTS: northbrook\n\n${separator}`;

describe('gitRawCommits', () => {
  it('parses commit messages', () => {
    const io = stdio();
    const cwd = __dirname;

    const spawn = mockSpawn(function (cp: MockChildProcess) {
      cp.stdout.write(logMessage);
      cp.end();
    });

    return gitRawCommits('asdf', io, __dirname, spawn)
      .then(commits => {
        assert.strictEqual(commits.length, 2);

        const firstCommit = commits[0];

        assert.strictEqual(firstCommit.abbreviatedHash, '520eae8');
        assert.strictEqual(firstCommit.authorEmail, 'tlsteinberger167@gmail.com');
        assert.strictEqual(firstCommit.authorName, 'Tylor Steinberger');
        assert.strictEqual(firstCommit.hash, '520eae83fcfd2da9cea3c0d336edd01258385e78');

        const firstMessage = firstCommit.message;

        assert.strictEqual(firstMessage.type, 'chore');
        assert.strictEqual(firstMessage.affects, null);
        assert.strictEqual(firstMessage.body, '');
        assert.strictEqual(firstMessage.breakingChanges, null);
        assert.strictEqual(firstMessage.issuesClosed, null);
        assert.strictEqual(firstMessage.scope, 'release');
        assert.strictEqual(firstMessage.subject, 'v3.2.1 [ci skip]');
        assert.strictEqual(firstMessage.suggestedUpdate, 0);

        const secondCommit = commits[1];
        const secondMessage = secondCommit.message;

        assert.strictEqual(secondCommit.abbreviatedHash, 'a5cf5fc');
        assert.strictEqual(secondCommit.authorEmail, 'tlsteinberger167@gmail.com');
        assert.strictEqual(secondCommit.authorName, 'Tylor Steinberger');
        assert.strictEqual(secondCommit.hash, 'a5cf5fc7ec139bfa21c89774963af251828af8a2');

        assert.strictEqual(secondMessage.type, 'fix');
        assert.strictEqual(secondMessage.affects && secondMessage.affects[0], 'northbrook');
        assert.strictEqual(secondMessage.body, '');
        assert.strictEqual(secondMessage.breakingChanges, null);
        assert.strictEqual(secondMessage.issuesClosed, null);
        assert.strictEqual(secondMessage.scope, 'northbrook');
        assert.strictEqual(secondMessage.subject, 'fix exec plugin');
        assert.strictEqual(secondMessage.suggestedUpdate, 1);
    });
  });
});
