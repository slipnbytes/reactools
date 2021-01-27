import { act, renderHook } from '@testing-library/react-hooks';
import { createRef, useRef, MutableRefObject } from 'react';

import { mergeRefs } from '@/resources/mergeRefs';

const data = {} as const;

type Data = typeof data;

describe('mergeRefs', () => {
  it('deve retornar o valor passado para o gancho', () => {
    const { result: ref } = renderHook(() => useRef<Data>(null));

    act(() => {
      mergeRefs<Data>([ref.current])(data);
    });

    expect(ref.current.current).toEqual(data);
  });

  it('deve retornar o valor passado para o gancho em todas as referências passadas', () => {
    const { result: ref1 } = renderHook(() => useRef<Data>(null));
    const { result: ref2 } = renderHook(() => useRef<Data>(null));

    act(() => {
      mergeRefs<Data>([ref1.current, ref2.current])(data);
    });

    expect(ref1.current.current).toEqual(data);
    expect(ref2.current.current).toEqual(data);
    expect(ref1.current.current).toEqual(ref2.current.current);
  });

  it('deve retornar o valor passado para o gancho usando referência de função', () => {
    const { result: ref } = renderHook(
      () => createRef<Data>() as MutableRefObject<Data>,
    );
    const fnRef = (value: Data) => {
      ref.current.current = value;
    };

    act(() => {
      mergeRefs<Data>([fnRef])(data);
    });

    expect(ref.current.current).toEqual(data);
  });

  it('não deve retornar o valor pois é uma referência inválida', () => {
    const ref = Symbol('ref');

    act(() => {
      mergeRefs<Data>([ref as any])(data);
    });

    expect((ref as any).current).not.toEqual(data);
  });

  it('deve retornar o valor passado para o gancho pois o objeto é editável', () => {
    const ref = {} as MutableRefObject<Data>;

    act(() => {
      mergeRefs<Data>([ref])(data);
    });

    expect(ref.current).toEqual(data);
  });
});
