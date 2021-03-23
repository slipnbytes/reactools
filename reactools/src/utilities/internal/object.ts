import { isObject } from './isObject';
import { isUndefined } from './isUndefined';

import type { AnyObject } from '@/shared/types';

export function getKeys(object: AnyObject): string[] {
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

export function makeObjectByKey<K extends string, V>(
  key: K,
  value: V,
): Record<K, V> {
  return <Record<K, V>>{
    [key]: value,
  };
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
  }

  return true;
}

export function update<T extends AnyObject>(
  object: T,
  updateObject: Partial<T>,
): T {
  const updatedObject = getKeys(object).reduce((currentObject, key): T => {
    if (!hasOwnProperty(updateObject, key)) {
      return currentObject;
    }

    const givenValue = pick(updateObject, key);

    if (isUndefined(givenValue)) {
      return currentObject;
    }

    const value = pick(object, key);

    if (isObject(value)) {
      return Object.assign(
        currentObject,
        makeObjectByKey(
          key,
          isObject(givenValue) ? update(value, givenValue) : value,
        ),
      );
    }

    return Object.assign(currentObject, makeObjectByKey(key, givenValue));
  }, cloneObject(object));

  return updatedObject;
}
