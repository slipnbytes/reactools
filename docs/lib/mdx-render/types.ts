import type { Options as MDXOptions } from '@mdx-js/mdx';

export interface Render {
  html: string;
  code: string;
  imports: string[];
}

export interface RenderOptions
  extends Pick<MDXOptions, 'remarkPlugins' | 'rehypePlugins'> {
  scope?: Scope;
}

export interface Scope {
  [key: string]: () => any;
}

export interface ScopeMock {
  [key: string]: () => string;
}
