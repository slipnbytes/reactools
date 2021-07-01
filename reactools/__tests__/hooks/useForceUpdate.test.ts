import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useForceUpdate } from '@/hooks/useForceUpdate';

describe('useForceUpdate', () => {
  it('should value must always be updated', async () => {
    const { result: forceUpdate, waitForNextUpdate } = renderHook(() =>
      useForceUpdate(),
    );

    await expect(waitForNextUpdate()).rejects.toEqual(expect.anything());

    act(() => {
      setTimeout(() => {
        forceUpdate.current();
      }, 500);
    });

    await expect(waitForNextUpdate()).resolves.toBe(undefined);
  });
});
