import fastGlob from 'fast-glob';

import { BASE_PATH } from './constants';
import { getFileInfo } from './getFileInfo';
import type { DocumentFile } from './types';

const INDEX_REGEX = /^index\.mdx?$/;

export async function getAllDocumentFiles(): Promise<DocumentFile[]> {
  const files = await fastGlob('**/*{md,mdx}', {
    cwd: BASE_PATH,
  });

  return files
    .filter(file => !INDEX_REGEX.test(file))
    .map(path => getFileInfo(path));
}
