import { AffectedPackages, Commit, Stdio } from '../../types';

import { gitLatestTag } from './gitLatestTag';
import { gitRawCommits } from './gitRawCommits';
import { spawn } from 'child_process';
import { stdio } from 'stdio-mock';

export function changedPackages (
  cwd: string = process.cwd(),
  io: Stdio = stdio(),
  latestTagSpawn = spawn,
  rawCommitsSpawn = spawn): Promise<AffectedPackages>
{
  const rawCommits: Promise<Array<Commit>> =
    gitLatestTag(cwd, io, latestTagSpawn)
      .then(commitHash => gitRawCommits(commitHash, io, cwd, rawCommitsSpawn));

  return rawCommits.then(getAffectedPackages);
}

function getAffectedPackages(commits: Array<Commit>) {
  const affectedCommits: AffectedPackages = {};

  commits
    .forEach(function (commit: Commit) {
      const affects = commit.message.affects;

      if (!affects || commit.message.scope === 'release') return;

      affects.forEach(name => {
        if (!affectedCommits[name]) {
          affectedCommits[name] = {
            name,
            commits: [commit],
          };
        } else {
          affectedCommits[name].commits.push(commit);
        }
      });
    });

  return affectedCommits;
}
