import { EOL } from 'os';
import { join } from 'path';
import { writeFile } from 'fs';
import { Stdio } from '../../';

export function writePackage(destination: string, content: string, io: Stdio) {
  return function (resolve: Function, reject: Function) {
    writeFile(join(destination, 'package.json'), content + EOL, (err: Error) => {
      if (err) reject(err);

      io.stdout.write(`Finished!` + EOL);

      resolve();
    });
  };
}
