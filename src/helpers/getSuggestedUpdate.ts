import { Commit } from '../types';

export function getSuggestedUpdate(commits: Commit[], method: 'comver' | 'semver' = 'semver') {
  let release = 0;

  for (let i = 0; i < commits.length; ++i) {
    const commit = commits[i];
    const suggestion = commit.message.suggestedUpdate;

    if (suggestion > release)
      release = suggestion;
  }

  if (release === 1 && method === 'comver')
    return 2;

  return release;
}
