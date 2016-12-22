import { Command, App } from '../';

export interface NorthbrookConfig extends Object<any> {
  plugins?: Array<string | App | Command>;
  packages?: Array<string>;
}

export interface Plugin {
  plugin: App | Command;
}

export interface Object<T> {
  [key: string]: T;
}

export interface STDIO {
  stdout?: NodeJS.WritableStream;
  stderr?: NodeJS.WritableStream;
  stdin?: NodeJS.ReadableStream;
}

export interface Stdio {
  stdout: NodeJS.WritableStream;
  stderr: NodeJS.WritableStream;
  stdin: NodeJS.ReadableStream;
}

export interface Commit {
  hash: string;
  abbreviatedHash: string;
  authorEmail: string;
  authorName: string;
  time: number;
  message: CommitMessage;
}

export type NoUpdate = 0;
export type PatchUpdate = 1;
export type MinorUpdate = 2;
export type MajorUpdate = 3;

export type SuggestedUpdate =
  NoUpdate | PatchUpdate | MinorUpdate | MajorUpdate;

export interface CommitMessage {
  type: string;
  scope: string | null;
  subject: string;
  body: string;
  affects: Array<string> | null;
  breakingChanges: string | null;
  issuesClosed: Array<string> | null;
  suggestedUpdate: SuggestedUpdate;
  raw: string;
}

export type AffectedPackage =
  { name: string, commits: Array<Commit> };

export type AffectedPackages =
  { [key: string]: AffectedPackage };
