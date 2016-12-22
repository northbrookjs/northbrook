import { spawn } from 'child_process';
import { execute, defaultStdio } from '../../helpers';
import { Stdio } from '../../types';
import { CommitAnswers, generateCommit } from './questions';

export function createCommit(
  answers: CommitAnswers,
  io: Stdio = defaultStdio,
  cwd: string = process.cwd(),
  _spawn = spawn): Promise<any>
{
  const commitMessage = generateCommit(
    answers.type,
    answers.scope,
    answers.subject,
    answers.body,
    answers.affects,
    answers.breakingChange,
    answers.issues,
  );

  return execute('git', ['commit', '-m', `${commitMessage}`], io, cwd, _spawn);
}
