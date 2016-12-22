import { EOL } from 'os';
import { spawn } from 'child_process';
import { valid } from 'semver';
import { stdio } from 'stdio-mock';
import { Stdio } from '../../types';
import { execute } from '../../helpers';

export function gitLatestTag(
  cwd: string = process.cwd(),
  io: Stdio = stdio(),
  _spawn = spawn): Promise<string>
{
  const regex = /tag:\s*(.+?)[,\)]/gi;
  const cmd = 'git';
  const args = ['log', '--decorate', '--no-color'];

  return execute(cmd, args, io, cwd, _spawn).then(({ stdout }) => {
    const lines = stdout.split(EOL);
    const tags: string[] = [];

    for (let i = 0; i < lines.length; ++i) {
      let match;

      while (match = regex.exec(lines[i])) {
        if (valid(match[1])) {
          tags.push(match[1]);
        }
      }
    }

    if (tags.length > 0)
      return tags[0];

    throw new Error('Failed to find any tags');
  });
}
