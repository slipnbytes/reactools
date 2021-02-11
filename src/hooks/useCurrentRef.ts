import { useState, useCallback, RefCallback } from 'react';

import type { RefValue } from '@/shared/types';

export type UseCurrentRefManager<T> = [RefValue<T>, RefCallback<T>];

export function useCurrentRef<T = any>(
  defaultValue: RefValue<T> = null,
): UseCurrentRefManager<T> {
  const [currentValue, setCurrentValue] = useState<RefValue<T>>(defaultValue);

  const setCurrentRefValue = useCallback<RefCallback<T>>(
    (newValue: RefValue<T>): void => {
      setCurrentValue(newValue);
    },
    [],
  );

  return [currentValue, setCurrentRefValue];
}
