import { useRef } from 'react';

import type { Nullable } from '@/shared/types';

interface UseManageableRefProxy<T>
  extends Pick<UseManageableRefManager<Nullable<T>>, 'current'> {}

export interface UseManageableRefManager<T> {
  current: T;
}

export function useManageableRef<T = any>(): UseManageableRefManager<
  Nullable<T>
>;

export function useManageableRef<T = any>(
  initialValue: T,
): UseManageableRefManager<T>;

export function useManageableRef<T = any>(
  initialValue: Nullable<T>,
): UseManageableRefManager<Nullable<T>>;

export function useManageableRef<T = any>(
  initialValue: Nullable<T> = null,
): UseManageableRefManager<Nullable<T>> {
  const stored = useRef(makeProxy<T>(initialValue));

  return stored.current as UseManageableRefManager<Nullable<T>>;
}

function makeProxy<T>(initialValue: Nullable<T>): UseManageableRefProxy<T> {
  const proxy = new Proxy<UseManageableRefProxy<T>>(
    {
      current: initialValue,
    },
    {
      set(
        target: UseManageableRefProxy<T>,
        property: keyof any,
        value: any,
      ): boolean {
        if (property === 'current') {
          target[property] = value; // eslint-disable-line no-param-reassign
        }

        return true;
      },
    },
  );

  return proxy;
}
