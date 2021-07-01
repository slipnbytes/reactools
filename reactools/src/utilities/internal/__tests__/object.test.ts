import { pick, update, hasOwnProperty, makeObjectByKey } from '../object';

describe('object', () => {
  test('makeObjectByKey()', () => {
    const object = makeObjectByKey('key', 'value');

    expect(hasOwnProperty(object, 'key')).toBe(true);
    expect(object).toEqual({ key: 'value' });

    expect(object.key).toBe('value');
  });

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

  test('update()', () => {
    let object;
    let newObject;

    object = {
      age: 10,
      username: 'username',
    };

    newObject = update(object, {
      username: 'new-username',
    });

    expect(newObject.age).toBe(10);
    expect(newObject.username).toBe('new-username');

    object = {
      user: {
        username: 'username',
      },
    };

    newObject = update(object, {
      user: {
        username: 'new-username',
      },
    });

    expect(newObject.user.username).toBe('new-username');

    newObject = update(object, {
      user: undefined,
    });

    expect(newObject.user.username).toBe('username');

    newObject = update(object, {
      user: null as unknown as undefined,
    });

    expect(newObject.user).toEqual(object.user);
  });
});
