import { NorthbrookConfig, Stdio } from './types';
import { DepGraph } from './northbrook';

import {
  CommandFlags,
  Alias,
  Flag,
  Description,
} from 'reginn';

// extend Reginn types globally
declare module 'reginn' {
  export interface HandlerOptions {
    args: Array<string>;
    options: any;
    config: NorthbrookConfig;
    depGraph: DepGraph;
    directory: string;
  }

  export interface Handler {
    (input: HandlerOptions | HandlerApp, stdio: Stdio): any;
  }

  export interface HandlerApp extends App, HandlerOptions { }

  export interface Command {
    type: 'command';
    flags: CommandFlags;
    aliases: Array<Alias>;
    commands: Array<Command>;
    description?: string;
    handler?: Handler;
  }

  export interface App {
    type: 'app';
    commands: Array<Command>;
    flags: CommandFlags;
  }

  export function app(...definitions: Array<Command | Flag | App>): App;
  export function command(...definitions: Array<Alias | Flag | Description | Command>): Command;
  export function withCallback(command: Command, handler: Handler): void;
  export function withPromise(command: Command): Promise<HandlerOptions | HandlerApp>;
}

export * from 'reginn';
export * from './types';
export * from './northbrook';
