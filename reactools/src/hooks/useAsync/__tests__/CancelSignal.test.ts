import { CancelSignal } from '../CancelSignal';

import type { Listener } from '@/shared/types';

describe('CancelSignal', () => {
  test('"on" and "off" methods', () => {
    const signal = new CancelSignal();

    function listener(): void {
      // void
    }

    function listener2(): void {
      // void
    }

    signal.on(listener);
    signal.on(listener2);

    expect(signal.listeners).toEqual([listener, listener2]);

    expect(() => {
      signal.on({} as unknown as Listener);
    }).toThrow(TypeError);

    signal.off(listener2);

    expect(signal.listeners).toEqual([listener]);
  });
});
