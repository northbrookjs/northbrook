import { EOL } from 'os';
import { Question, input } from 'typed-prompts';

export function scope(): Question {
  return input('scope', 'What scope does this commit cover:' + EOL + ' >', {
    validate: value => !!value,
  });
}
