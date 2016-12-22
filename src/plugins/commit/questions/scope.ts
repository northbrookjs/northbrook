import { EOL } from 'os';
import { Question, input } from 'typed-prompts';

export function scope(): Question {
  return input('scope', 'What scope does this commit covers:' + EOL, {
    validate: value => !!value,
  });
}
