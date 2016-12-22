import * as assert from 'assert';
import { join } from 'path';
import { exists, isDirectory, isFile } from './fs';

describe('exists', () => {
  it('returns true if a path exists', () => {
    assert.ok(exists(__filename));
  });

  it('return false if a path does not exist', () => {
    assert.ok(!exists(join(__dirname, Math.random() + 'asdf.test.ts')));
  });
});

describe('isDirectory', () => {
  it('returns true if a path is a directory', () => {
    assert.ok(isDirectory(__dirname));
  });

  it('returns false if a path is not a directory', () => {
    assert.ok(!isDirectory(__filename));
  });

  it('returns false if a path does not exist', () => {
    assert.ok(!isDirectory(join(__dirname, Math.random() + 'asdf.test.ts')));
  });
});

describe('isFile', () => {
  it('returns true if a path is a file', () => {
    assert.ok(isFile(__filename));
  });

  it('returns false if a path is not a directory', () => {
    assert.ok(!isFile(__dirname));
  });

  it('returns false if a path does not exist', () => {
    assert.ok(!isFile(join(__dirname, Math.random() + 'asdf.test.ts')));
  });
});
