import { transformAsync } from '@babel/core';
import mdx from '@mdx-js/mdx';
import ReactDOMServer from 'react-dom/server';

import { MDX_OPTIONS, BABEL_TRANSFORM_OPTIONS } from './constants';
import { getImports } from './getImports';
import { makeMarkdownElement } from './makeMarkdownElement';
import { makeScopeMock } from './makeScopeMock';
import type { Render, RenderOptions } from './types';

export async function render(
  markdown: string,
  options: RenderOptions = {},
): Promise<Render> {
  const {
    rehypePlugins = [],
    remarkPlugins = [],
    scope: defaultScope = {},
  } = options;

  const component = await mdx(
    markdown,
    Object.assign(MDX_OPTIONS, { rehypePlugins, remarkPlugins }),
  );

  const { code: defaultCode } = await transformAsync(
    component,
    BABEL_TRANSFORM_OPTIONS,
  );

  const imports = await getImports(component);
  const scope = Object.assign(makeScopeMock(imports), defaultScope);

  const code = makeFullCode(defaultCode);
  const html = ReactDOMServer.renderToStaticMarkup(
    makeMarkdownElement(defaultCode, scope),
  );

  return {
    html,
    code,
    imports,
  };
}

function makeFullCode(code: string): string {
  return `
    ${code}
    
    return React.createElement(MDXContent, {});
  `;
}
