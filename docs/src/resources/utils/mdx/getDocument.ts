import { render } from '@hitechline/next-mdx';
import { promises } from 'fs';
import matter from 'gray-matter';

import { REMARK_PLUGINS, REHYPE_PLUGINS } from '@shared/plugins';

import { getFileInfo } from './getFileInfo';
import { resolveFileBySlug } from './resolveFileBySlug';
import type { Document, DocumentInfo } from './types';

export async function getDocument(slug: string[]): Promise<Document> {
  const filePath = await resolveFileBySlug(slug);
  const { fullPath } = getFileInfo(filePath);

  const fileContent = await promises.readFile(fullPath, 'utf8');
  const { data: info, content: markdown } = matter(fileContent);

  const rendered = await render(markdown, {
    remarkPlugins: REMARK_PLUGINS,
    rehypePlugins: REHYPE_PLUGINS,
  });

  return {
    rendered,
    markdown,
    info: info as DocumentInfo,
  };
}
