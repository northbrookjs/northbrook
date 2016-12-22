import { prompt } from 'typed-prompts';
import { type } from './type';
import { scope } from './scope';
import { subject } from './subject';
import { body } from './body';
import { affects } from './affects';
import { breaking } from './breaking';
import { issues } from './issues';

export interface CommitAnswers {
  type: string;
  scope: string;
  subject: string;
  body: string;
  affects: string;
  breaking: 'yes' | 'no';
  breakingChange: string;
  issues: string;
}

export function askQuestions (
  packageNames: Array<string>): Promise<CommitAnswers>
{
  return prompt<CommitAnswers>(
    [
      type(),
      scope(),
      subject(),
      body(),
      affects(packageNames),
      ...breaking(),
      issues(),
    ],
  );
}
