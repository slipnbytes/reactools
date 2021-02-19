import type { Render } from '@lib/mdx-render/types';

export interface DocumentFile {
  path: string;
  name: string;
  fullName: string;
  fullPath: string;
  slug: string[];
}

export interface DocumentData {
  title: string;
}

export interface Document {
  markdown: string;
  rendered: Render;
  info: DocumentFile;
  data: DocumentData;
}
