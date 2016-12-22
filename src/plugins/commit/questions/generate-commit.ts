import { EOL } from 'os';

const MAX_LINE_LENGTH = 100;

export function generateCommit(
  type: string,
  scope: string,
  subject: string,
  body: string,
  affects: string,
  breaking: string,
  issues: string): string
{
  return escapeSpecialCharacters(
    (`${type}(${scope.trim()}): ${subject.trim()}` + EOL).slice(0, MAX_LINE_LENGTH) + EOL +
    wrap(body ? EOL + `${body.split('|').join(EOL)}` + EOL : ``) + EOL +
    wrap(affects ? EOL + `AFFECTS: ${affects}` + EOL : ``) + EOL +
    wrap(breaking ? EOL + `BREAKING CHANGE: ${EOL} ${breaking.split('|').join(EOL)}` + EOL : ``) +
    EOL + wrap(issues ? EOL + `ISSUES CLOSED: ${issues}` + EOL : ``));
}

function escapeSpecialCharacters(str: string): string {
  return str.replace(new RegExp('`', 'g'), '\\\\`');
}

function wrap(str: string) {
  if (!str) return str;

  const re = new RegExp('.{1,' + MAX_LINE_LENGTH + '}(\\s+|$)|\\S+?(\\s+|$)', 'g');
  return (str.match(re) || []).join(EOL).replace(/[ \t]*$/gm, '');
}
