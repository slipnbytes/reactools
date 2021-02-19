import MDXRuntime from '@mdx-js/runtime';
import ReactDOMServer from 'react-dom/server';

export function renderMarkdownToStaticMarkup(markdown: string): string {
  return ReactDOMServer.renderToStaticMarkup(
    MDXRuntime({
      children: markdown,
    }),
  );
}
