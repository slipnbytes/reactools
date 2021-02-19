import { useMDXComponents } from '@mdx-js/react';
import React, { useRef, useEffect } from 'react';
import { hydrate } from 'react-dom';

import { makeMarkdownElement } from './makeMarkdownElement';
import { makeScopeMock } from './makeScopeMock';
import type { Render } from './types';

export const Provider = ({ html, code, imports }: Render): JSX.Element => {
  const elementRef = useRef<HTMLDivElement>(null);
  const components = useMDXComponents({});

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const scope = Object.assign(makeScopeMock(imports), components);
    const markdownRendered = makeMarkdownElement(code, scope);

    hydrate(markdownRendered, elementRef.current);
  }, [html, code, imports]);

  return (
    <div
      ref={elementRef}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

/* eslint react/no-danger: 0 */
