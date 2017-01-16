import { EOL } from 'os';
import { CommitMessage } from '../../types';

// Hackish super dependent upon the way that commit plugin works
export function parseCommitMessage(rawCommit: string): CommitMessage {
  if (rawCommit.trim().startsWith('Merge')) {
    return {
      type: 'merge',
      scope: null,
      subject: '',
      body: '',
      affects: null,
      breakingChanges: null,
      issuesClosed: null,
      suggestedUpdate: 0,
      raw: rawCommit,
    };
  }

  try {
    const type = rawCommit.split('(')[0].trim();
    const scope = (rawCommit.split('(')[1] || '').split('):')[0].trim();
    const subject = (rawCommit.split('):') || '')[1].split(EOL)[0];

    const messageBody = rawCommit.split(subject)[1] || '';

    const body = messageBody
      .split('AFFECTS')[0] // ensure doesn't contain affects
      .split('BREAKING')[0] // ensure doesn't contain breaking changes
      .split('ISSUES')[0] // ensure doesn't contain the issues closed
      .replace(new RegExp(`[${EOL}]{2,}`, 'g'), EOL).trim();

    const affects = getAffects(messageBody);
    const breakingChanges = getBreakingChanges(messageBody);
    const issuesClosed = getIssuesClosed(messageBody);

    const suggestedUpdate = getSuggestedUpdate(type, breakingChanges);

    return {
      type,
      scope,
      subject: subject.trim(),
      body,
      affects,
      breakingChanges,
      issuesClosed,
      suggestedUpdate,
      raw: rawCommit,
    };
  } catch (e) {
    return {
      type: '',
      scope: '',
      subject: '',
      body: '',
      affects: null,
      breakingChanges: null,
      issuesClosed: null,
      suggestedUpdate: 0,
      raw: rawCommit,
    };
  }
}

function getAffects(messageBody: string) {
  const affects = messageBody.split('AFFECTS:')[1];

  if (!affects) return null;

  return affects.split(EOL + EOL)[0]
    .trim()
    .split(',')
    .map(str => str.trim());
}

function getBreakingChanges(messageBody: string) {
  const breakingChanges = messageBody.split(/BREAKING[\sA-Z]+:/)[1];

  if (!breakingChanges) return null;

  return breakingChanges.split(EOL + EOL)[0].trim();
}

function getIssuesClosed(messageBody: string) {
  const issuesClosed = messageBody.split(/ISSUES[\sA-Z]+:/)[1];

  if (!issuesClosed) return null;

  return issuesClosed.trim().split(',').map(str => str.trim());
}

/*
 * Suggested Updates Using Semver
 * 0: none
 * 1: patch
 * 2: minor
 * 3: major
 */
function getSuggestedUpdate(type: string, breakingChanges: string | null) {
  if (breakingChanges !== null) return 3;
  if (type === 'feat') return 2;
  if (type === 'fix' || type === 'perf') return 1;

  return 0;
}
