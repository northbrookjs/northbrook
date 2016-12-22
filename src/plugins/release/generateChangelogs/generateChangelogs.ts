import { map } from 'ramda';
import { ReleasePackage } from '../types';
import { generateChangelog } from './generateChangelog';

export function generateChangelogs(packages: ReleasePackage[]) {
  return Promise.all(map(generateChangelog, packages));
}
