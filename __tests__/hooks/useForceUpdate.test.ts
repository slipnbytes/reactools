import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useForceUpdate } from '@/hooks/useForceUpdate';

describe('useForceUpdate', () => {
  it('should value must always be updated', async done => {
    const { result: forceUpdate, waitForNextUpdate } = renderHook(() =>
      useForceUpdate(),
    );

    act(() => {
      setTimeout(() => {
        forceUpdate.current();
      }, 500);
    });

    await waitForNextUpdate();
    done();
  });
});
