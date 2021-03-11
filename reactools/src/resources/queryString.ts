import { isURL } from '@/utilities/internal/isURL';

import { AnyObject } from '@/shared/types';

const QUERY_REGEX = /(\?([\w-]+(=[^=?&]*)(&[\w-]+(=[^=?&]*)?)*)?)/g;

function clean(value: string): string {
  if (typeof value !== 'string') {
    return '';
  }

  return String(value)
    .trim()
    .replace(/^[?#&]/, '');
}

export function parseQueryString(query: string): string {
  if (isURL(query)) {
    return new URL(query).search;
  }

  return clean(query).replace(/^\/+/, '');
}

export function removeQueryString(value: string): string {
  if (isURL(value)) {
    const url = new URL(value);

    return `${url.origin}${url.pathname}`;
  }

  const valueCleaned = clean(value);
  const queryEntries = valueCleaned.match(QUERY_REGEX) ?? [];

  return queryEntries.reduce(
    (currentValue, query) => currentValue.replace(query, ''),
    valueCleaned,
  );
}

export function getQueryString<T extends AnyObject = AnyObject>(
  query: string,
): T {
  const queryObject = {} as T;

  const queryParsed = parseQueryString(query);
  const urlSearchParams = new URLSearchParams(queryParsed);

  urlSearchParams.forEach((value: any, key: keyof T) => {
    let valueParsed = value;

    try {
      valueParsed = JSON.parse(value);
    } catch {
      // Silent
    }

    queryObject[key] = valueParsed;
  });

  return queryObject;
}
