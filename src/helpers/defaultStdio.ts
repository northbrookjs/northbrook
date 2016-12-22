import { Stdio } from '../types';

export const defaultStdio: Stdio =
  {
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
  };
