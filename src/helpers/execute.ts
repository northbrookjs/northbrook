import { spawn } from 'child_process';
import { EOL } from 'os';

import { Stdio } from '../types';

export function execute(
  cmd: string,
  args: Array<string>,
  io: Stdio,
  cwd: string,
  _spawn = spawn): Promise<{ stdout: string, stderr: string }>
{
  const stdio = [
    io.stdin === process.stdin ? 'inherit' : 'pipe',
    io.stdout === process.stdout ? 'inherit' : 'pipe',
    io.stderr === process.stderr ? 'inherit' : 'pipe',
  ];

  return new Promise((resolve, reject) => {
    const cp = _spawn(cmd, args, { cwd, stdio });

    const successBuffer: string[] = [];
    const errorBuffer: string[] = [];

    if (stdio[0] === 'pipe')
      io.stdin.pipe(cp.stdin);

    if (stdio[1] === 'pipe')
      cp.stdout.on('data', d => {
        successBuffer.push(d.toString());
        io.stdout.write(d);
      });

    if (stdio[2] === 'pipe')
      cp.stderr.on('data', d => {
        errorBuffer.push(d.toString());
        io.stderr.write(d);
      });

    const output = () => ({ stdout: successBuffer.join(''), stderr: errorBuffer.join('') });

    const resolveWithBuffer = () => resolve(output());
    const rejectWithBuffer = () => reject(output());

    cp.on('close', writeAndEnd(io.stdout, resolveWithBuffer));
    cp.on('end', writeAndEnd(io.stdout, resolveWithBuffer));
    cp.on('error', writeAndEnd(io.stderr, rejectWithBuffer));
  });
}

function writeAndEnd(writable: NodeJS.WritableStream, end: Function) {
  return function () {
    writable.write(EOL);
    end();
  };
};
