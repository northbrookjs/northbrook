import { join } from 'path';
import { Command, HandlerApp, HandlerOptions } from 'reginn';
import { Stdio } from '../../types';

export function each(command: Command, callback: EachCallback): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    command.handler = function (input: any, stdio: Stdio) {
      const { config, options } = input;

      const packages = config.packages.map((path: string) => {
        const pkg = require(join(path, 'package.json'));

        return {
          path,
          config: pkg,
          name: pkg.name,
        };
      });

      const onlyPackages: Array<any> = options.only
        ? options.only.split(',')
        : packages.map((p: any) => p.name);

      const packagesToExec = packages
        .filter((p: any) => onlyPackages.indexOf(p.name) > -1);

      if (packagesToExec.length === 0)
        stdio.stderr.write(`No packages could be found`);

      const call = createCallback(callback, input, stdio);

      return sequence(packagesToExec, call).then(resolve).catch(reject);
    };
  });
}

function createCallback(callback: EachCallback, input: HandlerApp | HandlerOptions, stdio: Stdio) {
  return function (pkg: EachPkg): Promise<any> {
    const handlerOptions: EachHandlerOptions =
      Object.assign({}, input, { pkg, args: input.args.slice(0) }) as any as EachHandlerOptions;

    return coerceToPromise(callback(handlerOptions, stdio));
  };
}

function sequence(packages: Array<EachPkg>, call: (pkg: EachPkg) => Promise<any>): Promise<any> {
  return packages.reduce((promise: Promise<any>, pkg: EachPkg) => {
    return promise.then(() => call(pkg));
  }, Promise.resolve());
}

function coerceToPromise(x: any): Promise<any> {
  return x && typeof x.subscribe === 'function'
    ? observableToPromise(x)
    : Promise.resolve(x);
}

function observableToPromise(x: any) {
  return new Promise((resolve, reject) => {
    x.subscribe(createObserver(resolve, reject));
  });
}

function createObserver(resolve: Function, reject: Function) {
  return {
    next: Function.prototype,
    error: reject,
    complete: resolve,
  };
}

export type EachPkg =
  { pkg: { path: string, name: string, config: any } };

export type EachHandlerOptions =
  (HandlerApp & EachPkg) |
  (HandlerOptions & EachPkg);

export interface EachCallback {
  (input: EachHandlerOptions, stdo: Stdio): any;
}
