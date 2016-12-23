import * as assert from 'assert';

import { filterScope } from './filterScope';

describe('filterScope', () => {
  it('should remove scope from package name', () => {
    assert.strictEqual(filterScope('mocha'), 'mocha');
    assert.strictEqual(filterScope('@northbrook/mocha'), 'mocha');
    assert.strictEqual(filterScope('@northbrook/tslint'), 'tslint');
  });
});
