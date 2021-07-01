import {
  renderHook,
  WaitForNextUpdateOptions,
} from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useAsync } from '@/hooks/useAsync';
import { waitDelay } from '@/utilities/internal/waitDelay';

const WAIT_OPTIONS: WaitForNextUpdateOptions = {
  timeout: false,
};

const data = {
  user: null,
};

describe('useAsync', () => {
  it('should not receive data and error because the inserted callback is invalid', () => {
    const emptyObject = {};
    const { result: async } = renderHook(() =>
      useAsync(emptyObject as any as () => unknown),
    );

    expect(async.current.loading).toBe(false);

    expect(async.current.data).not.toBeDefined();
    expect(async.current.error).not.toBeDefined();
  });

  it('should receive the data returned by the callback', async () => {
    const { result: async, waitForNextUpdate } = renderHook(() =>
      useAsync(() => {
        return data;
      }),
    );

    expect(async.current.loading).toBe(true);

    await waitForNextUpdate(WAIT_OPTIONS);

    expect(async.current.loading).toBe(false);

    expect(async.current.error).not.toBeDefined();
    expect(async.current.data).toEqual(data);
  });

  it('should receive the data returned by the asynchronous callback', async () => {
    const { result: async, waitForNextUpdate } = renderHook(() =>
      useAsync(async () => {
        await waitDelay(1000);
        return data;
      }),
    );

    await waitForNextUpdate(WAIT_OPTIONS);

    expect(async.current.loading).toBe(false);

    expect(async.current.error).not.toBeDefined();
    expect(async.current.data).toEqual(data);
  });

  it('should only receive error', async () => {
    const { result: async, waitForNextUpdate } = renderHook(() =>
      useAsync(async () => {
        await waitDelay(1000);
        throw new Error();
      }),
    );

    await waitForNextUpdate(WAIT_OPTIONS);

    expect(async.current.loading).toBe(false);

    expect(async.current.data).not.toBeDefined();
    expect(async.current.error).toBeInstanceOf(Error);
  });

  it('should not receive data and error because the execution is canceled', async () => {
    const { result: async, waitForNextUpdate } = renderHook(() =>
      useAsync(async ({ cancel }) => {
        await waitDelay(1000);
        cancel();
      }),
    );

    await waitForNextUpdate(WAIT_OPTIONS);

    expect(async.current.loading).toBe(false);

    expect(async.current.data).not.toBeDefined();
    expect(async.current.error).not.toBeDefined();
  });

  it('should receive data because the execution was canceled after finishing', async () => {
    const { result: async, waitForNextUpdate } = renderHook(() =>
      useAsync(async () => {
        await waitDelay(1000);
        return data;
      }),
    );

    await waitForNextUpdate(WAIT_OPTIONS);

    expect(async.current.loading).toBe(false);

    expect(async.current.error).not.toBeDefined();
    expect(async.current.data).toEqual(data);

    act(() => {
      async.current.cancel();
    });

    expect(async.current.error).not.toBeDefined();
    expect(async.current.data).toEqual(data);
  });
});
