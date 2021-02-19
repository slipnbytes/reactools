import { mdx } from '@mdx-js/react';
import React from 'react';

import type { Scope } from './types';

export function makeMarkdownElement(
  code: string,
  scope: Scope = {},
): JSX.Element {
  const fullScope = {
    ...scope,
    React,
    mdx,
  };

  const functionElement = Reflect.construct(Function, [
    ...Object.keys(fullScope),
    code,
  ]);

  const elementRendered = functionElement.apply(
    functionElement,
    Object.values(fullScope),
  );

  return elementRendered;
}
