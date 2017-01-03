import { EOL } from 'os';
import { Command, HandlerApp, HandlerOptions } from 'reginn';
import { Stdio, Pkg } from '../../types';
import { packagesToExecute, getChangedPackages } from '../../helpers';
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
