export function incrementName (code: number) {
  switch (code) {
    case 1: return 'patch';
    case 2: return 'minor';
    case 3: return 'major';
    default: return false;
  }
}
