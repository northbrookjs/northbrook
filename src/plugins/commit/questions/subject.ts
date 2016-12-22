import { EOL } from 'os';
import { Question, input } from 'typed-prompts';

export function subject(): Question {
  return input('subject', 'Write a short, imperative tense description of the change:' + EOL, {
    validate: value => !!value,
  });
}