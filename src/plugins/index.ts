import { app, App } from '../';

import { plugin as commit } from './commit';
export { plugin as exec } from './exec';
export { plugin as link } from './link';
export { plugin as release } from './release';

const get = (name: string) => require('./' + name).plugin;

export const plugin: App =
  app(get('commit'), get('exec'), get('link'), get('release'));
