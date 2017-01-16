import { Stdio } from '../../../types';
import { execute } from '../../../helpers';

export function npmLogin (io: Stdio, cwd: string) {
  return retry(execute, 3, 'npm', ['login'], io, cwd);
}

function retry(f: (...args: any[]) => Promise<any>, amount: number, ...args: any[]): Promise<any> {
  return f(...args).catch(e => {
    console.log('Retrying...');

    if (amount - 1 > 0)
      return retry(f, amount - 1, ...args);

    throw e;
  });
}
