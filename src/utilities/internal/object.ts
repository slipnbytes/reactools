import { isObject } from './isObject';

import type { AnyObject } from '@/shared/types'; // eslint-disable-line import/order

export function getKeys(object: AnyObject): string[] {
  require('@/polyfills/object#keys');
  return Object.keys(object);
}

export function cloneObject<T extends AnyObject>(
  object: T,
  createObject: any = object,
): T {
  return Object.assign(Object.create(createObject), object);
}

export function pick(object: AnyObject, path: string): any {
  const properties = path.split('.');

  return properties.reduce((currentObject, currentProperty) => {
    return isObject(currentObject) ? currentObject[currentProperty] : undefined;
  }, cloneObject(object));
}

export function hasOwnProperty(object: AnyObject, property: string): boolean {
  let currentObject = object;
  const properties = property.split('.');

  /* eslint-disable no-plusplus, no-continue */
  for (let index = 0; index < properties.length; index++) {
    const currentProperty = properties[index];

    if (
      isObject(currentObject) &&
      Object.prototype.hasOwnProperty.call(currentObject, currentProperty)
    ) {
      currentObject = currentObject[currentProperty];
      continue;
    }

    return false;
    /* eslint-enable */
  }

  return true;
}
