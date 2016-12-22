import * as assert from 'assert';
import { EOL } from 'os';
import { MockReadable, MockWritable } from 'stdio-mock';
import { askQuestions } from './askQuestions';

const ENTER = EOL;

const stdin = process.stdin;
const stdout = process.stdout;

const input = new MockReadable();
const output = new MockWritable();

describe('askQuestions', () => {
  before(() => {
    Object.defineProperties(process, {
      'stdin': {
        value: input,
      },
      'stdout': {
        value: output,
      },
    });
  });

  after(() => {
    Object.defineProperties(process, {
      'stdin': {
        value: stdin,
      },
      'stdout': {
        value: stdout,
      },
    });
  });

  it('asks a series of questions', () => {
    const expected = {
      type: 'feat',
      scope: 'northbrook',
      subject: 'subject',
      body: 'body',
      affects: [],
      breaking: 'no',
      issues: '',
    };

    Promise.resolve(input)
      .then(cmd(ENTER)) // type
      .then(cmd(expected.scope, ENTER)) // scope
      .then(cmd(expected.subject, ENTER)) // subject
      .then(cmd(expected.body, ENTER)) // body
      .then(cmd(ENTER)) // affects
      .then(cmd('n', ENTER)) // breaking
      .then(cmd(ENTER)); // issues closed

    function cmd (...cmds: Array<any>) {
      return function (mockReadable: MockReadable) {
        cmds.forEach(x => mockReadable.write(x));

        return new Promise((resolve) => {
          // wait 10 seconds between commands to simulate user input
          // also passes irregularly at anything less than 6 or 7 ms
          setTimeout(resolve, 10, mockReadable);
        });
      };
    }

    return askQuestions(['a', 'b']).then(answers => {
      assert.deepEqual(answers, expected);
    });
  });
});
