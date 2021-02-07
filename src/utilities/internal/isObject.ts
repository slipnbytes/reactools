import type { ObjectType } from '@/shared/types';

export function isObject<T extends ObjectType = ObjectType>(
  value: any,
): value is T {
  return value && value.constructor === Object;
}
