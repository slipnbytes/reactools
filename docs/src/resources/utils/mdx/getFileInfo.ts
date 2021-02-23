import { join } from 'path';

import { BASE_PATH } from './constants';
import type { DocumentFile } from './types';

export function getFileInfo(filePath: string): DocumentFile {
  const pathCleaned = filePath.replace(/\.mdx?/, '');
  const pathSplited = pathCleaned.split(/\//g);

  return {
    path: filePath,
    slug: pathSplited,
    fullName: pathCleaned,
    name: pathSplited.slice(-1)[0],
    fullPath: join(BASE_PATH, filePath),
  };
}
