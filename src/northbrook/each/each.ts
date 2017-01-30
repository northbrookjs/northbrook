import { Command, HandlerApp, HandlerOptions } from 'reginn';
import { Pkg, Stdio } from '../../types';
import { getChangedPackages, packagesToExecute } from '../../helpers';

import { EOL } from 'os';
import { sequence } from '@typed/sequence';

export function each(command: Command, callback: EachCallback): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    command.handler = function (input: HandlerOptions, io: Stdio) {
      const { config, options } = input;

      const call = createCallback(callback, input, io);

      const packagesToExec = options.changed
        ? getChangedPackages(config.packages as Array<string>)
        : Promise.resolve(packagesToExecute(input));

      return packagesToExec
        .then(packages => {
          if (packages.length === 0)
            return io.stdout.write(`No packages could be found` + EOL);

          return sequence(packages, call);
        })
        .then(resolve)
        .catch(reject);
    };
  }).catch((e: any) => {
    if (e && e.stderr) {
      process.stderr.write(e.stderr + EOL);
    } else {
      process.stderr.write((e && e.message || e) + EOL);
    }

    process.exit(1);
  });
}

function createCallback(callback: EachCallback, input: HandlerApp | HandlerOptions, stdio: Stdio) {
  return function (pkg: Pkg): Promise<any> {
    const handlerOptions: EachHandlerOptions =
      Object.assign({}, input, { pkg, args: input.args.slice(0) }) as EachHandlerOptions;

    return callback(handlerOptions, stdio);
  };
}

export type EachPkg = { pkg: Pkg };

export type EachHandlerOptions =
  (HandlerApp & EachPkg) |
  (HandlerOptions & EachPkg);

export interface EachCallback {
  (input: EachHandlerOptions, stdo: Stdio): any;
}
