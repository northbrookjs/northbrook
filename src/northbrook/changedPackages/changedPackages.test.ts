import * as assert from 'assert';
import { EOL } from 'os';
import { stdio } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';

import { changedPackages } from './changedPackages';
import { separator } from './gitRawCommits';
import { AffectedPackage } from '../../types';

function testCommitMessage (
  type = 'feat',
  affectedPackages = ['that', 'this'],
  affects = true,
  breaking = true,
  issues = true)
{
return `${type}(test-commit): this is a test commit message

Hello this is a commit message body
${affects ? `${EOL}AFFECTS: ${affectedPackages.join(', ')}${EOL + EOL}` : ''}
${breaking ? `${EOL}BREAKING CHANGES: things and stuff that changed, yo${EOL + EOL}` : '' }
${issues ? `${EOL}ISSUES CLOSED: #1, #7` : '' }
`;
}

const logMessage =
`a5cf5fc7ec139bfa21c89774963af251828af8a2${separator}` +
`a5cf5fc${separator}` +
`Tylor Steinberger${separator}` +
`tlsteinberger167@gmail.com${separator}` +
`1474495060${separator}` +
`${testCommitMessage()}${separator}` +
`a7cf5fc7ec139bfa21c89774963af251828af8a2${separator}` +
`a7cf5fc${separator}` +
`Tylor Steinberger${separator}` +
`tlsteinberger167@gmail.com${separator}` +
`1474495070${separator}` +
`${testCommitMessage('feat', [`that`], true, false, false)}${separator}`+
`a9cf5fc7ec139bfa21c89774963af251828af8a2${separator}` +
`a9cf5fc${separator}` +
`Tylor Steinberger${separator}` +
`tlsteinberger167@gmail.com${separator}` +
`1474495090${separator}` +
`${testCommitMessage('feat', [`that`], false, false, false)}${separator}`;

describe('changedPackages', () => {
  it('returns a promise containg affected packages', () => {
    const io = stdio();

    const latestTagSpawn = mockSpawn(function (cp: MockChildProcess) {
      cp.stdout.write('commit 7d7a7d (tag: v1.2.3)' + EOL);
      setTimeout(() => cp.end());
    });

    const rawCommitsSpawn = mockSpawn(function (cp: MockChildProcess) {
      cp.stdout.write(logMessage);
      setTimeout(() => cp.end());
    });

    return changedPackages(__dirname, io, latestTagSpawn, rawCommitsSpawn)
      .then(affectedPackages => {
        assert.strictEqual(Object.keys(affectedPackages).length, 2);

        const that: AffectedPackage = (affectedPackages as any).that;

        assert.strictEqual(that.name, 'that');
        assert.strictEqual(that.commits.length, 2);

        const _this: AffectedPackage = (affectedPackages as any).this;

        assert.strictEqual(_this.name, 'this');
        assert.strictEqual(_this.commits.length, 1);
      });
  });
});
