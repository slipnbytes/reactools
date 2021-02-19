import { promises } from 'fs';
import { join } from 'path';

import { BASE_PATH, EXTENSION_MD, EXTENSION_MDX } from './constants';

export async function resolveFileBySlug(slug: string[]): Promise<string> {
  const array: string[] = [];
  const slugParsed = array.concat(slug).join('/');
  const slugFullPath = join(BASE_PATH, slugParsed);

  const hasFileWithExtension_MD = await exists(
    `${slugFullPath}.${EXTENSION_MD}`,
  );

  if (hasFileWithExtension_MD) {
    return `${slugParsed}.${EXTENSION_MD}`;
  }

  const hasFileWithExtension_MDX = await exists(
    `${slugFullPath}.${EXTENSION_MDX}`,
  );

  if (hasFileWithExtension_MDX) {
    return `${slugParsed}.${EXTENSION_MDX}`;
  }

  throw new Error('File not existis.');
}

async function exists(path: string): Promise<boolean> {
  return promises
    .access(path)
    .then(() => true)
    .catch(() => false);
}
