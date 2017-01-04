import { Stdio } from '../../../types';
import { execute } from '../../../helpers';

export function npmLogin (io: Stdio, cwd: string) {
    return execute('npm', ['login'], io, cwd);
}
