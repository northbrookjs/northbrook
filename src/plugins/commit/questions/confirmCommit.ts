import { EOL } from 'os';
import { Question, expand } from 'typed-prompts';
import { generateCommit } from './generate-commit';

const choices =
  [
    { key: 'y', name: 'Yes', value: 'yes' },
    { key: 'n', name: 'Abort commit', value: 'no' },
  ];

const SEP =
  EOL + '###--------------------------------------------------------###' + EOL;

export function confirmCommit(stdout: NodeJS.WritableStream): Question {
  return expand('confirmCommit', answers => {
    stdout.write(SEP +
      generateCommit(
        answers.type,
        answers.scope,
        answers.subject,
        answers.body,
        answers.affects,
        answers.breakingChange,
        answers.issues,
      ) + SEP + EOL);
    return 'Are you sure you want to proceed with the commit above?';
  }, choices);
}