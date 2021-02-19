import type { RenderData } from '@hitechline/next-mdx';

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
  data: DocumentData;
  rendered: RenderData;
}
