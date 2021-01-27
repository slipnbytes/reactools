import { isObject } from '@/utilities/internal/isObject';
import { pick, getKeys } from '@/utilities/internal/object';

export type MergeClassNameObjectType = Record<string, boolean>;

export type MergeClassNameType =
  | string
  | number
  | undefined
  | MergeClassNameObjectType;

export function mergeClassNames(...classNames: MergeClassNameType[]): string {
  const mergedClassNames = classNames.map((className): string => {
    if (isObject(className)) {
      const classNamesKeys = getKeys(className);
      const classNamesKeysFiltered = classNamesKeys.filter(key => {
        const value = pick(className, key);

        return Boolean(value);
      });

      return classNamesKeysFiltered.join(' ');
    }

    if (['number', 'string'].includes(typeof className)) {
      return String(className);
    }

    return '';
  });

  return mergedClassNames.join(' ').trim();
}
