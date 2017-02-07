import { join } from 'path';
import { EOL } from 'os';
import { union, clone } from 'ramda';
import { Pkg } from '../../types';

const DependencyGraph = require('dependency-graph').DepGraph;

export function buildDependencyGraph(packagePaths: Array<string>, circular: Array<string> = []) {
  const configs: { [packageName: string]: Pkg } = {};
  const graph: { [pacakgename: string]: Array<Pkg> } = {};

  packagePaths.forEach(packageFinder(configs));

  const depGraph = new DependencyGraph();
  const packages = Object.keys(configs).map(key => configs[key]);
  const packageNames: Array<string> = packages.map(pkg => pkg.name);

  packages.forEach(({ name, config }) => {
    const devDependencies: Array<string> =
      findDependencies(config.devDependencies, packageNames);

    const peerDependencies: Array<string> =
      findDependencies(config.peerDependencies, packageNames);

    const dependencies: Array <string> =
      findDependencies(config.dependencies, packageNames);

    const allDependencies: Array<string> =
      union(union(devDependencies, peerDependencies), dependencies);

    depGraph.addNode(name, configs[name]);

    graph[name] = allDependencies.map(depName => configs[depName]);
  });

  packageNames.forEach(name => {
    if (circular.indexOf(name) === -1) {
      const deps = graph[name];

      deps.forEach(dep => {
        if (circular.indexOf(dep.name) === -1)
          depGraph.addDependency(name, dep.name);
      });
    }
  });

  return new DepGraph(depGraph, configs, circular);
}

export class DepGraph {
  constructor (
    private depGraph: any,
    private configs: { [key: string]: Pkg },
    private circular: Array<string>) {}

  public dependenciesOf (packageName: string) {
    return this.depGraph.dependenciesOf(packageName);
  }

  public dependantsOf (packageName: string): Array<string> {
    return this.depGraph.dependantsOf(packageName);
  }

  public configOf(packageName: string): Pkg {
    return clone(this.depGraph.getNodeData(packageName));
  }

  public paths(): Array<string> {
    return this.packages().map(pkg => pkg.path);
  }

  public packages(): Array<Pkg> {
    const configs = this.configs;

    return this.packageNames().map(name => configs[name]);
  }

  public packageNames(): Array<string> {
    const { depGraph, circular } = this;

    try {
      return depGraph.overallOrder()
        .filter((name: string) => circular.indexOf(name) === -1)
        .concat(circular);
    } catch (e) {
      const circularPackage = e.message.split(':')[1].split('->')[0].trim();

      throw new Error(EOL + EOL + `${e.message}` + EOL + EOL +
        `Circular dependencies are an advanced use-case and must be handled explicitly.` + EOL +
        `To handle circular dependencies it is required to create a ` + EOL +
        `Northbrook configuration file` + `containing at least:` + EOL + EOL +
        `  module.exports = {` + EOL +
        `    circular: [ '${circularPackage}' ]` + EOL +
        `  }` + EOL);
    }
  }
}

function packageFinder(configs: any) {
  return function (path: string) {
    const pkgJson = clone(require(join(path, 'package.json')));

    configs[pkgJson.name] = { path, name: pkgJson.name, config: pkgJson };
  };
}

function findDependencies(dependencies: any, packageNames: Array<String>): Array<string> {
  if (!dependencies) return [];

  return Object.keys(dependencies)
    .filter(name => packageNames.indexOf(name) > -1);
};
