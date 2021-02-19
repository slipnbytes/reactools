import { render } from '@lib/mdx-render/render';
import { promises } from 'fs';
import matter from 'gray-matter';

import { getFileInfo } from './getFileInfo';
import { resolveFileBySlug } from './resolveFileBySlug';
import type { Document, DocumentData } from './types';

export async function getDocument(slug: string[]): Promise<Document> {
  const filePath = await resolveFileBySlug(slug);
  const info = getFileInfo(filePath);

  const fileContent = await promises.readFile(info.fullPath, 'utf8');
  const { data, content: markdown } = matter(fileContent);

  const rendered = await render(markdown);

  return {
    info,
    rendered,
    markdown,
    data: data as DocumentData,
  };
}
