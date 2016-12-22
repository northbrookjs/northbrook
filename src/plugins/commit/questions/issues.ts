import { EOL } from 'os';
import { Question, input } from 'typed-prompts';

export function issues(): Question {
  return input(
    'issues',
    'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:' + EOL,
    {
      when: answers => answers.type !== 'WIP',
    },
  );
}