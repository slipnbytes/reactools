import NextLink, { LinkProps } from 'next/link';
import { HTMLAttributes } from 'react';
import { UrlObject } from 'url';

interface Props extends LinkProps, HTMLAttributes<HTMLElement> {}

export const Link = ({
  children,
  ...rest
}: PropsWithChildren<Props>): JSX.Element => {
  const nextLinkProps = DEFAULT_PROPS.reduce(
    (obj, prop) => Object.assign(obj, { [prop]: rest[prop] }),
    {},
  ) as LinkProps;

  return (
    <NextLink {...nextLinkProps}>
      <a
        {...rest}
        href={((rest.as as UrlObject)?.href ?? rest.as ?? rest.href) as string}
      >
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
