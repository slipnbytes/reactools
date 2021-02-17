import { promises } from 'fs';
import matter from 'gray-matter';
import ReactDOMServer from 'react-dom/server';

import { getFileInfo } from './getFileInfo';
import { makeMDX } from './makeMDX';
import { resolveFileBySlug } from './resolveFileBySlug';
import type { Document, DocumentData } from './types';

export async function getDocument(slug: string[]): Promise<Document> {
  const filePath = await resolveFileBySlug(slug);
  const info = getFileInfo(filePath);

  const fileContent = await promises.readFile(info.fullPath, 'utf8');
  const { data, content: markdown } = matter(fileContent);

  const element = ReactDOMServer.renderToString(makeMDX(markdown)());

  return {
    info,
    content: element,
    data: data as DocumentData,
  };
}
