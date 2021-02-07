import { isUndefined } from './isUndefined';

export function isUndefinedOrNull(value: any): value is undefined | null {
  return value === null || isUndefined(value);
}
