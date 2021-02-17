import MDX from '@mdx-js/runtime';
import { REMARK_PLUGINS, REHYPE_PLUGINS } from '@shared/plugins';
import React from 'react';

export function makeMDX(content: any): () => JSX.Element {
  return () => (
    <MDX remarkPlugins={REMARK_PLUGINS} rehypePlugins={REHYPE_PLUGINS}>
      {content}
    </MDX>
  );
}

/* eslint react/display-name:0 */
