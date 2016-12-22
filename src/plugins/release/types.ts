import { Commit } from '../../types';

export type ReleasePackage = {
  pkg: any;
  name: string;
  directory: string;
  commits: Array<Commit>;
};
