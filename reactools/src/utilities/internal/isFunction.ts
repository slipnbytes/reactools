export function isFunction(value: any): value is (...params: any[]) => any {
  return (
    value && (value.constructor === Function || typeof value === 'function')
  );
}
