import { EOL } from 'os';
import { types } from '../commit-types';
import { map, prop, values } from 'ramda';
import { Question, list } from 'typed-prompts';
import { longest, rightPad } from './helpers';

const COMMIT_TYPES: Array<string> = Object.keys(types);
const COMMIT_DESCRIPTIONS: Array<string> =
  map<any, string>(prop('description'), values(types));

export function type(): Question {
  const length = longest(COMMIT_TYPES).length + 1;

  const choices = COMMIT_TYPES
    .map((type: string, i: number) => {
      return {
        name: rightPad(type + ':', length) + ' ' + COMMIT_DESCRIPTIONS[i],
        value: type,
      };
    });

  return list('type', 'Select the type of change you are committing:' + EOL, choices);
}