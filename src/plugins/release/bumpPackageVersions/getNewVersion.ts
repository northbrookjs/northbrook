export function getNewVersion ([major, minor, patch]: Array<string>, increment: number) {
  switch (increment) {
    case 1: return `${major}.${minor}.${parseInt(patch) + 1}`;
    case 2: return `${major}.${parseInt(minor) + 1}.0`;
    case 3: return `${parseInt(major) + 1}.0.0`;
    default: return `${major}.${minor}.${patch}`;
  }
}
