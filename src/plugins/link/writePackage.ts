import { EOL } from 'os';
import { join } from 'path';
import { writeFile } from 'fs';

export function writePackage(destination: string, content: string) {
  return function (resolve: Function, reject: Function) {
    writeFile(join(destination, 'package.json'), content + EOL, (err: Error) => {
      if (err) reject(err);

      resolve();
    });
  };
}
