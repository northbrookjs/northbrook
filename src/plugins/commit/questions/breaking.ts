import { EOL } from 'os';
import { Question, ExpandChoices, expand, input } from 'typed-prompts';

const choices: ExpandChoices =
  [
    { key: 'n', name: 'No', value: 'no' },
    { key: 'y', name: 'Yes', value: 'yes' },
  ];

export function breaking(): Array<Question> {
  const isBreaking =
    expand('breaking', 'Does this commit introduce BREAKING CHANGES?', choices, {
      when: answers => answers.type === 'fix' || answers.type === 'feat',
    });

  const breakingChanges =
    input(
      'breakingChange',
      'Provide a description of the breaking changes. Use "|" to break new linke' + EOL,
      {
        when: answers => answers.breaking === 'yes',
      },
    );

  return [
    isBreaking,
    breakingChanges,
  ];
}