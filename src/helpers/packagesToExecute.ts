import { join } from 'path';
import { HandlerOptions, Pkg } from '../';

export function packagesToExecute (input: HandlerOptions): Array<Pkg> {
  const { config, options } = input;

  const packages: Array<Pkg> =
    (config.packages as Array<string>).map((path: string): Pkg => {
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

  return packagesToExec;
}
