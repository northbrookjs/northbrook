import { Question, ListChoice, checkbox } from 'typed-prompts';
import { concat, map } from 'ramda';

const extraChoices: Array<ListChoice> =
  [
    { name: 'META - Overall monorepo', value: 'META' },
  ];

const toListChoice = (name: string) => ({ name, value: name.trim() });

export function affects(packageNames: Array<string>): Question {
  const choices: Array<ListChoice> =
    concat(map<string, ListChoice>(toListChoice, packageNames), extraChoices);

  return checkbox('affects', 'What package(s) does this commit affect?', choices);
}
