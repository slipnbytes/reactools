import { act, renderHook } from '@testing-library/react-hooks';
import { createRef, useRef, MutableRefObject } from 'react';

import { mergeRefs } from '@/resources/mergeRefs';

const data = {} as const;

type Data = typeof data;

describe('mergeRefs', () => {
  it('should receive the value passed to the hook', () => {
    const { result: ref } = renderHook(() => useRef<Data>(null));

    act(() => {
      mergeRefs<Data>([ref.current])(data);
    });

    expect(ref.current.current).toEqual(data);
  });

  it('should receive the value passed to the hook in all references passed', () => {
    const { result: ref1 } = renderHook(() => useRef<Data>(null));
    const { result: ref2 } = renderHook(() => useRef<Data>(null));

    act(() => {
      mergeRefs<Data>([ref1.current, ref2.current])(data);
    });

    expect(ref1.current.current).toEqual(data);
    expect(ref2.current.current).toEqual(data);
    expect(ref1.current.current).toEqual(ref2.current.current);
  });

  it('should receive the value passed to the hook using function reference', () => {
    const { result: ref } = renderHook(
      () => createRef<Data>() as MutableRefObject<Data>,
    );
    const fnRef = (value: Data): void => {
      ref.current.current = value;
    };

    act(() => {
      mergeRefs<Data>([fnRef])(data);
    });

    expect(ref.current.current).toEqual(data);
  });

  it('should not receive the value because it is an invalid reference', () => {
    const ref = Symbol('ref');

    act(() => {
      mergeRefs<Data>([ref as any])(data);
    });

    expect((ref as any).current).not.toEqual(data);
  });

  it('should receive the value passed to the hook because the object is editable', () => {
    const ref = {} as MutableRefObject<Data>;

    act(() => {
      mergeRefs<Data>([ref])(data);
    });

    expect(ref.current).toEqual(data);
  });
});
