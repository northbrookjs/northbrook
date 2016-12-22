import * as assert from 'assert';
import { EOL } from 'os';
import { parseCommitMessage } from './parseCommitMessage';

/*
Handles merge commits
generates correct
  - type
  - scope
  - subject
  - body
  - affects
  - breakingChanges
  - issuesClosed
  - suggestedUpdate
*/

const testCommitMessage = (type = 'feat', affects = true, breaking = true, issues = true) =>
`${type}(test-commit): this is a test commit message

Hello this is a commit message body
${affects ? `${EOL}AFFECTS: this, that${EOL + EOL}` : ''}
${breaking ? `${EOL}BREAKING CHANGES: things and stuff that changed, yo${EOL + EOL}` : '' }
${issues ? `${EOL}ISSUES CLOSED: #1, #7` : '' }
`;

describe('parseCommitMessage', () => {
  it('handles merge commits', () => {
    const commitMessage =
      `Merge master branch into working branch${EOL}Merge commit message body`;

    const commit = parseCommitMessage(commitMessage);

    assert.strictEqual(commit.type, 'merge');
    assert.strictEqual(commit.scope, null);
    assert.strictEqual(commit.subject, 'Merge master branch into working branch');
    assert.strictEqual(commit.body, 'Merge commit message body');
    assert.strictEqual(commit.affects, null);
    assert.strictEqual(commit.breakingChanges, null);
    assert.strictEqual(commit.issuesClosed, null);
    assert.strictEqual(commit.issuesClosed, null);
    assert.strictEqual(commit.suggestedUpdate, 0);
    assert.strictEqual(commit.raw, commitMessage);
  });

  it('parses complete commit messages', () => {
    const commit = parseCommitMessage(testCommitMessage());

    assert.strictEqual(commit.type, 'feat');
    assert.strictEqual(commit.scope, 'test-commit');
    assert.strictEqual(commit.subject, 'this is a test commit message');
    assert.strictEqual(commit.body, 'Hello this is a commit message body');
    assert.deepEqual(commit.affects, ['this', 'that']);
    assert.strictEqual(commit.breakingChanges, 'things and stuff that changed, yo');
    assert.deepEqual(commit.issuesClosed, ['#1', '#7']);
    assert.strictEqual(commit.suggestedUpdate, 3);
  });

  it('parses commit message without affects breakingChanges or issuesClosed', () => {
    const commit = parseCommitMessage(testCommitMessage('fix', false, false, false));

    assert.strictEqual(commit.type, 'fix');
    assert.strictEqual(commit.scope, 'test-commit');
    assert.strictEqual(commit.subject, 'this is a test commit message');
    assert.strictEqual(commit.body, 'Hello this is a commit message body');
    assert.deepEqual(commit.affects, null);
    assert.strictEqual(commit.breakingChanges, null);
    assert.deepEqual(commit.issuesClosed, null);
    assert.strictEqual(commit.suggestedUpdate, 1);
  });

  it('parses different scopes and suggestedUpdates', () => {
    let commit = parseCommitMessage(testCommitMessage('feat', false, false, false));

    assert.strictEqual(commit.type, 'feat');
    assert.strictEqual(commit.suggestedUpdate, 2);

    commit = parseCommitMessage(testCommitMessage('fix', false , false, false));

    assert.strictEqual(commit.type, 'fix');
    assert.strictEqual(commit.suggestedUpdate, 1);

    commit = parseCommitMessage(testCommitMessage('perf', false , false, false));

    assert.strictEqual(commit.type, 'perf');

    commit = parseCommitMessage(testCommitMessage('WIP', false , false, false));

    assert.strictEqual(commit.type, 'WIP');
    assert.strictEqual(commit.suggestedUpdate, 0);
  });
});
