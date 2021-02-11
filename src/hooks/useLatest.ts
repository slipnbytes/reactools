import { useRef, useEffect } from 'react';

export interface UseLatestManager<T> {
  readonly current: T;
}

export function useLatest<T = any>(value: T): UseLatestManager<T> {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}
