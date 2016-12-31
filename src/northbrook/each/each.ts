import { Command, HandlerApp, HandlerOptions } from 'reginn';
import { Stdio, Pkg } from '../../types';
import { packagesToExecute } from '../../helpers';
import { sequence } from '@typed/sequence';

export function each(command: Command, callback: EachCallback): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    command.handler = function (input: HandlerOptions, stdio: Stdio) {
      const packagesToExec = packagesToExecute(input);

      if (packagesToExec.length === 0)
        return stdio.stderr.write(`No packages could be found`);

      const call = createCallback(callback, input, stdio);

      return sequence<Pkg>(packagesToExec, call).then(resolve).catch(err => {
        reject(err);

        process.nextTick(() => process.exit(1));
      });
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
