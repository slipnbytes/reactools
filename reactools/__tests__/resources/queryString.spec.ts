import { getQueryString, removeQueryString } from '@/resources/queryString';

const urlPath = '/';
const url = 'http://localhost/';

describe('queryString', () => {
  describe('removeQueryString', () => {
    it('should receive the URL without query string', () => {
      expect(removeQueryString(baseQuery(url))).toBe(url);
      expect(removeQueryString(complexQuery(url))).toBe(url);
    });

    it('should receive the path without query string', () => {
      expect(removeQueryString(baseQuery(urlPath))).toBe(urlPath);
      expect(removeQueryString(complexQuery(urlPath))).toBe(urlPath);
    });
  });

  describe('getQueryString', () => {
    it('should receive an object corresponding to the URL query string', () => {
      expect(getQueryString(baseQuery(url))).toEqual(BASE_QUERY_OBJECT);
      expect(getQueryString(complexQuery(url))).toEqual(COMPLEX_QUERY_OBJECT);
    });

    it('should receive an object corresponding to the path query string', () => {
      expect(getQueryString(baseQuery(urlPath))).toEqual(BASE_QUERY_OBJECT);
      expect(getQueryString(complexQuery(urlPath))).toEqual(
        COMPLEX_QUERY_OBJECT,
      );
    });
  });
});

const BASE_QUERY_OBJECT = {
  search: 'all',
};

const COMPLEX_QUERY_OBJECT = {
  age: 20,
  name: 'paul',
  search: 'all',
  platform: 'xbox one',
};

function makeQuery(path: string, query: Record<string, any>): string {
  return `${path}?${new URLSearchParams(query).toString()}`;
}

function baseQuery(path: string): string {
  return makeQuery(path, BASE_QUERY_OBJECT);
}

function complexQuery(path: string): string {
  return makeQuery(path, COMPLEX_QUERY_OBJECT);
}
