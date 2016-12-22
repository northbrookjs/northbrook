import { Commit } from '../types';

export function getSuggestedUpdate(commits: Commit[]) {
  let release = 0;

  for (let i = 0; i < commits.length; ++i) {
    const commit = commits[i];
    const suggestion = commit.message.suggestedUpdate;

    if (suggestion > release)
      release = suggestion;
  }

  return release;
}
