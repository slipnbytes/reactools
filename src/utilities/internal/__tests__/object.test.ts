import { pick, hasOwnProperty } from '../object';

describe('object', () => {
  test('pick()', () => {
    const object = {};

    expect(pick(object, 'user')).toBe(undefined);
    expect(pick(object, 'user.name')).toBe(undefined);
  });

  test('hasOwnProperty()', () => {
    const object: Record<any, any> = {};

    expect(hasOwnProperty(object, 'user')).toBe(false);
    expect(hasOwnProperty(object, 'user.name')).toBe(false);

    object.user = {};

    expect(hasOwnProperty(object, 'user')).toBe(true);
    expect(hasOwnProperty(object, 'user.name')).toBe(false);

    object.user.name = 'name';

    expect(hasOwnProperty(object, 'user.name')).toBe(true);
  });
});
