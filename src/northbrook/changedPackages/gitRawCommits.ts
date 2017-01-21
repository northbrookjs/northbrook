import { execute } from '../../helpers';
import { Commit, Stdio } from '../../types';
import { spawn } from 'child_process';
import { stdio } from 'stdio-mock';
import { parseCommitMessage } from './parseCommitMessage';

export const separator = '-----------';

export const format =
  '%H' + separator + // commit hash
  '%h' + separator + // abbreviated commit hash;
  '%an' + separator + // author name
  '%ae' + separator + // author email
  '%ct' + separator + // author data UNIX timestamp
  '%B' + separator; // raw body

export function gitRawCommits(
  fromCommitHash: any,
  io: Stdio = stdio(),
  cwd: string = process.cwd(),
  _spawn = spawn): Promise<Array<Commit>>
{
  const cmd = `git`;
  const args = [
    `log`,
    `--format=${format}`,
    fromCommitHash !== void 0 ? `${fromCommitHash}..HEAD` : ``,
  ];

  return execute(cmd, args, io, cwd, _spawn).then(({ stdout }) => {
    const hashesAndMessages = stdout.split(separator);
    const commits = [];

    for (let i = 0; i < hashesAndMessages.length; i = i + 6) {
      // usually end up with an extra "empty" set
      if (!hashesAndMessages[i + 5]) break;

      const hash = hashesAndMessages[i].replace('\n', '');
      const abbreviatedHash = hashesAndMessages[i + 1];
      const authorName = hashesAndMessages[i + 2];
      const authorEmail = hashesAndMessages[i + 3];
      const time = parseInt(hashesAndMessages[i + 4]);
      const message = hashesAndMessages[i + 5];

      commits.push({
        hash,
        abbreviatedHash,
        authorEmail,
        authorName,
        time,
        message: parseCommitMessage(message),
      });
    }

    return commits;
  });
};
