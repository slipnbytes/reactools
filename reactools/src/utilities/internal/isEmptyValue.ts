import { isUndefinedOrNull } from './isUndefinedOrNull';

export function isEmptyValue(value: any): boolean {
  return value === '' || isUndefinedOrNull(value);
}
