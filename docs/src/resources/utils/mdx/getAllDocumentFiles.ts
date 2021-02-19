import { promises } from 'fs';

import { BASE_PATH } from './constants';
import { getFileInfo } from './getFileInfo';
import type { DocumentFile } from './types';

export async function getAllDocumentFiles(): Promise<DocumentFile[]> {
  const files = await promises.readdir(BASE_PATH);

  return files.map(path => getFileInfo(path));
}
