import type { RenderData } from '@hitechline/next-mdx';

export interface DocumentFile {
  path: string;
  name: string;
  fullName: string;
  fullPath: string;
  slug: string[];
}

export interface DocumentInfo {
  title: string;
  description: string;
}

export interface Document {
  markdown: string;
  info: DocumentInfo;
  rendered: RenderData;
}
