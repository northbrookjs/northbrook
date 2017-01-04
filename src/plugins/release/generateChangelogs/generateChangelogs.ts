import { ReleasePackage } from '../types';
import { generateChangelog } from './generateChangelog';
import { sequence } from '@typed/sequence';

export function generateChangelogs(packages: ReleasePackage[]) {
  return sequence(packages, generateChangelog).then(() => packages);
}
