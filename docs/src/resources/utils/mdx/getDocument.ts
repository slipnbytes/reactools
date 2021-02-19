import { render } from '@hitechline/next-mdx';
import { REMARK_PLUGINS, REHYPE_PLUGINS } from '@shared/plugins';
import { promises } from 'fs';
import matter from 'gray-matter';

import { getFileInfo } from './getFileInfo';
import { resolveFileBySlug } from './resolveFileBySlug';
import type { Document, DocumentData } from './types';

export async function getDocument(slug: string[]): Promise<Document> {
  const filePath = await resolveFileBySlug(slug);
  const { fullPath } = getFileInfo(filePath);

  const fileContent = await promises.readFile(fullPath, 'utf8');
  const { data, content: markdown } = matter(fileContent);

  const rendered = await render(markdown, {
    remarkPlugins: REMARK_PLUGINS,
    rehypePlugins: REHYPE_PLUGINS,
  });

  return {
    rendered,
    markdown,
    data: data as DocumentData,
  };
}
