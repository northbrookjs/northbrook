import * as assert from 'assert';
import { EOL } from 'os';
import { dirname } from 'path';

import { stdio, MockWritable } from 'stdio-mock';
import { mockSpawn, MockChildProcess } from 'spawn-mock';

import { Commit } from '../../../types';
import { ReleasePackage } from '../types';
import { generateChangelog, currentDate } from './generateChangelog';

const expected =
`
# 1.0.0 (${currentDate()})
---

## Breaking Changes

1. stuff and things
  - feat(northbrook): the break [abcdefgh](example.com/commits/abcdefghijklmnop)

## Features

- feat(northbrook): the best ever [abcdefgh](example.com/commits/abcdefghijklmnop)

## Bug Fixes

- fix(northbrook): the best ever [abcdefgh](example.com/commits/abcdefghijklmnop)

`.trim();

describe('generateChangelog', () => {
  it('generates a changelog', () => {
    const time = Date.now();

    const commits: Array<Commit> =
      [
        {
          hash: 'abcdefghijklmnop',
          abbreviatedHash: 'abcdef',
          authorEmail: 'tlsteinberger167@gmail.com',
          authorName: 'Tylor Steinberger',
          time,
          message: {
            type: 'feat',
            scope: 'northbrook',
            subject: 'the best ever',
            body: 'body',
            affects: ['northbrook'],
            breakingChanges: null,
            issuesClosed: null,
            suggestedUpdate: 2,
            raw: `feat(northbrook): the best ever${EOL}${EOL}body${EOL}${EOL}AFFECTS: northbrook`;
          },
        },
        {
          hash: 'abcdefghijklmnop',
          abbreviatedHash: 'abcdef',
          authorEmail: 'tlsteinberger167@gmail.com',
          authorName: 'Tylor Steinberger',
          time,
          message: {
            type: 'fix',
            scope: 'northbrook',
            subject: 'the best ever',
            body: 'body',
            affects: ['northbrook'],
            breakingChanges: null,
            issuesClosed: null,
            suggestedUpdate: 1,
            raw: `fix(northbrook): the best ever${EOL}${EOL}body${EOL}${EOL}AFFECTS: northbrook`;
          },
        },
        {
          hash: 'abcdefghijklmnop',
          abbreviatedHash: 'abcdef',
          authorEmail: 'tlsteinberger167@gmail.com',
          authorName: 'Tylor Steinberger',
          time,
          message: {
            type: 'feat',
            scope: 'northbrook',
            subject: 'the break',
            body: 'breaking stuff',
            affects: ['northbrook'],
            breakingChanges: 'stuff and things',
            issuesClosed: null,
            suggestedUpdate: 3,
            raw: `feat(northbrook): the break${EOL}${EOL}body${EOL}${EOL}AFFECTS: northbrook`;
          },
        },
      ];

    const releasePackage: ReleasePackage =
      {
        pkg: {
          name: 'name',
          version: '1.0.0',
          url: 'example.com',
        },
        name: 'name',
        directory: dirname(process.env.HOME),
        commits,
      };

    const io = stdio();

    const spawn = mockSpawn((cp: MockChildProcess) => cp.end());

    const writeStream = new MockWritable();

    return generateChangelog(releasePackage, io, spawn, writeStream).then(() => {
      const data = writeStream.data().join('').trim();

      assert.strictEqual(data, expected);
    });
  });
});
