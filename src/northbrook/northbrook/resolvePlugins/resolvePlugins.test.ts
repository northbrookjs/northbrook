import { EOL } from 'os';
import { join } from 'path';
import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { resolvePlugins } from './resolvePlugins';
import { strip } from 'typed-colors';

const pluginPath = join(__dirname, '__test__');

describe('resolvePlugins', () => {
  it('returns an array of require()d plugins', () => {
    const plugins = resolvePlugins(['a', 'b', 'c'], pluginPath, stdio());
    assert.strictEqual(plugins.length, 2);
  });

  it('should write to stdout which plugins failed to load', (done) => {
    const io = stdio();

    io.stdout.on('data', (data: string) => {
      assert.equal(strip(data.toString()), 'WARNING: Could not resolve plugin: c' + EOL);
      done();
    });

    resolvePlugins(['c'], pluginPath, io);
  });
});
