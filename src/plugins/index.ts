import { app, App } from '../';

import { plugin as commit } from './commit';
import { plugin as exec } from './exec';
import { plugin as link } from './link';
import { plugin as release } from './release';

export const plugin: App =
  app(commit, exec, link, release);
