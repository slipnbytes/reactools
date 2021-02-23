import { Ref, RefCallback, MutableRefObject } from 'react';

import { logger } from '@/shared/logger';
import { isFunction } from '@/utilities/internal/isFunction';
import { isObject } from '@/utilities/internal/isObject';
import { isUndefined } from '@/utilities/internal/isUndefined';
import { hasOwnProperty } from '@/utilities/internal/object';

export function mergeRefs<T = any>(refsToMerge: Ref<T>[]): RefCallback<T> {
  return (value: T) => {
    refsToMerge.forEach((refToMerge, index) => {
      const refCallbackToMerge = refToMerge as RefCallback<T>;

      if (isFunction(refCallbackToMerge)) {
        refCallbackToMerge(value);
        return;
      }

      if (!isObject<MutableRefObject<T>>(refToMerge)) {
        return;
      }

      const refObjectToMerge = refToMerge;
      const descriptor = Object.getOwnPropertyDescriptor(
        refObjectToMerge,
        'current',
      );

      if (!descriptor) {
        logger.warn(
          `mergeRefs() - The "current" property does not exist in the "${index}" index reference.`,
        );
      }

      if (isUndefined(descriptor)) {
        refObjectToMerge.current = value;
        return;
      }

      /* istanbul ignore next */
      if (!descriptor?.writable) {
        return;
      }

      if (
        hasOwnProperty(descriptor as PropertyDescriptor, 'value') ||
        isFunction(descriptor?.set)
      ) {
        refObjectToMerge.current = value;
      }
    });
  };
}
