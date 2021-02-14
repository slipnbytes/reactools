import { useState, useCallback, RefCallback } from 'react';

import type { Nullable } from '@/shared/types';

export type UseCurrentRefManager<T> = [T, RefCallback<T>];

export function useCurrentRef<T = any>(): UseCurrentRefManager<Nullable<T>>;

export function useCurrentRef<T = any>(
  initialValue: T,
): UseCurrentRefManager<T>;

export function useCurrentRef<T = any>(
  initialValue: Nullable<T>,
): UseCurrentRefManager<Nullable<T>>;

export function useCurrentRef<T = any>(
  initialValue: Nullable<T> = null,
): UseCurrentRefManager<Nullable<T>> {
  const [currentValue, setCurrentValue] = useState<Nullable<T>>(
    () => initialValue,
  );

  const setCurrentRefValue = useCallback<RefCallback<T>>(
    (newValue: Nullable<T>): void => {
      setCurrentValue(newValue);
    },
    [],
  );

  return [currentValue, setCurrentRefValue];
}
