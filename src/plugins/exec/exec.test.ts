import { stdio } from 'stdio-mock';

import { northbrook } from '../../';
import { plugin } from './exec';

describe('Exec Plugin', () => {
  it('executes a command in each package', (done) => {
    const config = {
      plugins: [],
      packages: ['__test__/**'],
    };

    const args = ['exec', '--', 'echo', 'hello'];

    const io = stdio();

    let called = 0;
    io.stdout.on('data', function (data: Buffer | string) {
      if (data.toString().trim() === 'hello') {
        ++called;
        if (called === 2) {
          setTimeout(done, 100);
        }
      }
    });

    northbrook(config, [{ plugin }], __dirname, io).start(args);
  });
});
