export function getNewVersion ([major, minor, patch]: Array<string>, increment: number) {
  switch (increment) {
    case 1: return `v${major}.${minor}.${parseInt(patch) + 1}`;
    case 2: return `v${major}.${parseInt(minor) + 1}.0`;
    case 3: return `v${parseInt(major) + 1}.0.0`;
    default: return `v${major}.${minor}.${patch}`;
  }
}
