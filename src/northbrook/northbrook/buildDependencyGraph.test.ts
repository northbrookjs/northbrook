import * as assert from 'assert';
import { join } from 'path';
import { buildDependencyGraph } from './buildDependencyGraph';

const pkg = (name: string) => join(__dirname, '__test__/' + name);

const packageA = pkg('a');
const packageB = pkg('b');
const packageC = pkg('c');
const packageD = pkg('d');
const packageE = pkg('e');
const packageF = pkg('f');

describe('buildDependencyGraph', () => {
  describe('given packages as input', () => {
    it('builds a dependency graph', () => {
      const packages = [ packageA, packageB, packageC, packageD ];

      const graph = buildDependencyGraph(packages);

      assert.deepEqual(graph.paths(), [packageA, packageC, packageB, packageD]);
    });

    it('throws an error when there is a circular dependency', () => {
      const packages = [ packageE, packageF ];
      const graph = buildDependencyGraph(packages);

      assert.throws(() => {
        graph.paths();
      });
    });

    it('does not throw an error when given circular configuration', () => {
      const packages = [ packageE, packageF ];
      const graph = buildDependencyGraph(packages, [ 'e-testpackage' ]);

      const paths = graph.paths();

      assert.deepEqual(paths, [packageF, packageE]);
    });
  });
});
