import { spawn } from 'child_process';
import { stdio } from 'stdio-mock';
import { EOL } from 'os';
import { join } from 'path';
import { readFileSync, createWriteStream } from 'fs';

import { execute, exists } from '../../../helpers';
import { Stdio, Commit } from '../../../types';
import { ReleasePackage } from '../types';

const commitMessage = 'docs(CHANGELOG): append to changelog';

export function generateChangelog (
  releasePackage: ReleasePackage,
  io: Stdio = stdio(),
  _spawn = spawn,
  writeStream?: NodeJS.WritableStream): Promise<ReleasePackage>
{
  const { directory } = releasePackage;

  const CHANGELOG = join(directory, 'CHANGELOG.md');

  const fileContents = exists(CHANGELOG) ? readFileSync(CHANGELOG).toString() : EOL;

  const writeFileSream = writeStream || createWriteStream(CHANGELOG);

  return writeChangelog(releasePackage, fileContents, writeFileSream)
    .then(() => execute('git', ['add', 'CHANGELOG.md'], io, directory, _spawn))
    .then(() => execute('git', ['commit', '-m', commitMessage], io, directory, _spawn))
    .then(() => releasePackage);
}

function writeChangelog(
  releasePackage: ReleasePackage,
  fileContents: string,
  changelog: NodeJS.WritableStream): Promise<any>
{
  return new Promise((resolve, reject) => {
    const { pkg: { version, bugs = { url: '' } } } = releasePackage;

    const sections: any = {
      breaks: [] as Commit[],
      feat: [] as Commit[] ,
      fix: [] as Commit[],
      perf: [] as Commit[],
    };

    const titles: any = {
      breaks: `Breaking Changes`,
      feat: `Features`,
      fix: `Bug Fixes`,
      perf: `Performance Improvements`,
    };

    changelog.write(`# ${version} (${currentDate()})${EOL}---${EOL}`);

    releasePackage.commits.forEach(function (commit: Commit) {
      const message = commit.message;
      const type = message.type;

      if (!titles[type]) return;

      if (message.breakingChanges) {
        sections.breaks.push(commit);
      } else {
        sections[type] = sections[type].concat(commit);
      }
    });

    Object.keys(titles).forEach(section => {
      const commits = sections[section];
      const title = titles[section];

      if (commits.length === 0) return;

      changelog.write(`${EOL}## ${title}${EOL}${EOL}`);

      if (section === 'breaks') {
        commits.forEach((commit: Commit, i: number) => {
          changelog.write(`${i + 1}. ` + commit.message.breakingChanges + EOL);
          changelog.write(
            `  - ${commit.message.raw.split(EOL)[0].trim()} ` +
            `${linkToCommit(commit.hash, bugs.url)}`,
          );
          changelog.write(EOL);
        });
      } else {
        commits.forEach((commit: Commit) => {
          changelog.write(
            `- ${commit.message.raw.split(EOL)[0].trim()} ` +
            `${linkToCommit(commit.hash, bugs.url)}`,
          );
          changelog.write(EOL);
        });
      }
    });

    changelog.write(EOL);

    changelog.write(fileContents);

    changelog.on('finish', () => resolve(releasePackage));
    changelog.on('end', () => resolve(releasePackage));

    try {
      changelog.end();
    } catch (e) {
      reject(e);
    }
  });
}

function linkToCommit (hash: string, url: string) {
  return `[${hash.substr(0, 8)}](${url.replace('/issues', '')}/commits/${hash}\)`;
}

export function currentDate () {
  const now = new Date();

  const pad = function (i: number) {
    return ('0' + i).substr(-2);
  };

  return `${now.getFullYear()}-` +
         `${pad(now.getMonth() + 1)}-` +
         `${pad(now.getDate())}`;
}
