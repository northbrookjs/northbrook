import { EOL } from 'os';
import { Question, input } from 'typed-prompts';

export function body(): Question {
  return input('body',
    'Provide a LONGER description of the change (optional). Use "|" to break new line:' + EOL);
}