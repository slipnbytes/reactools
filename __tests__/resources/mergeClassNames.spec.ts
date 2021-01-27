import { mergeClassNames } from '@/resources/mergeClassNames';

describe('mergeClassNames', () => {
  it('should receive same inserted value', () => {
    const mergedClassNames = mergeClassNames('block');

    expect(mergedClassNames).toBe('block');
  });

  it('should be empty as the value entered is undefined', () => {
    const mergedClassNames = mergeClassNames(undefined);

    expect(mergedClassNames).toBe('');
  });

  it('should receive the value of the inserted string', () => {
    let mergedClassNames = mergeClassNames(undefined, 'null');

    expect(mergedClassNames).toBe('null');

    mergedClassNames = mergeClassNames(null as any, 'undefined');

    expect(mergedClassNames).toBe('undefined');
  });

  it('should receive the first parameter concatened with the truth keys of object', () => {
    let mergedClassNames!: string;

    mergedClassNames = mergeClassNames('block', {
      visible: true,
    });

    expect(mergedClassNames).toContain('block');
    expect(mergedClassNames).toContain('visible');

    mergedClassNames = mergeClassNames('block', {
      visible: false,
    });

    expect(mergedClassNames).toBe('block');
    expect(mergedClassNames).not.toContain('visible');

    mergedClassNames = mergeClassNames('block', {
      flex: true,
      visible: false,
    });

    expect(mergedClassNames).toContain('flex');
    expect(mergedClassNames).toContain('block');
    expect(mergedClassNames).not.toContain('visible');
  });
});
