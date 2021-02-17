import NextLink, { LinkProps } from 'next/link';
import React, { HTMLAttributes } from 'react';

interface Props extends LinkProps, HTMLAttributes<HTMLElement> {}

export const Link = ({ children, ...rest }: PropsWithChildren<Props>) => {
  const nextLinkProps = DEFAULT_PROPS.reduce(
    (obj, prop) => Object.assign(obj, { [prop]: rest[prop] }),
    {},
  ) as LinkProps;

  return (
    <NextLink {...nextLinkProps}>
      <a {...rest} href={(rest.as || rest.href) as string}>
        {children}
      </a>
    </NextLink>
  );
};

const DEFAULT_PROPS = [
  'as',
  'href',
  'scroll',
  'replace',
  'prefetch',
  'passHref',
];
