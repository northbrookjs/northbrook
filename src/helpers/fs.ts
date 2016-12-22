import { Stats, statSync } from 'fs';

export function exists (pathname: string): Stats | false {
  try {
    return statSync(pathname);
  } catch (e) {
    return false;
  }
}

export function isDirectory (pathname: string): boolean {
  const stats = exists(pathname);
  return stats ? stats.isDirectory() : false;
}

export function isFile(pathname: string): boolean {
  const stats = exists(pathname);
  return stats ? stats.isFile() : false;
}
