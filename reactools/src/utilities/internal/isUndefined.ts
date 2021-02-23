export function isUndefined(value: any): value is undefined {
  return value === undefined || typeof value === 'undefined';
}
