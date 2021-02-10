import type { AnyObject } from '@/shared/types';

export function isObject<T extends AnyObject = AnyObject>(
  value: any,
): value is T {
  return value && value.constructor === Object;
}
