import * as assert from 'assert';
import { northbrook, NorthbrookConfig, command, alias, withPromise } from '../../';
import { stdio } from 'stdio-mock';

const config: NorthbrookConfig =
  {
    packages: ['resolvePackages/__test__/*'],
    plugins: ['resolvePlugins/__test__/a', 'resolvePlugins/__test__/b'],
  };

const cwd = __dirname;

describe('northbrook', () => {
  it('should match and run plugins', (done) => {
    const plugin = command(alias('hello'));

    withPromise(plugin).then(() => {
      done();
    });

    const { stdout, stderr } = stdio();

    const additionalPlugins = [ { plugin } ];

    const { start, plugins, packages } =
      northbrook(config, additionalPlugins, cwd, { stdout, stderr });

    assert.strictEqual(plugins.length, 3);
    assert.strictEqual(packages.length, 2);

    start(['hello']);
  });
});
