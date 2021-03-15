import { useRef, useMemo, useEffect, useReducer, useCallback } from 'react';

import { logger } from '@/shared/logger';
import { isFunction } from '@/utilities/internal/isFunction';

import { CancelController } from './CancelController';
import { CANCEL_SYMBOL, INITIAL_DATA } from './constants';
import { reducer } from './reducer';

import {
  UseAsyncManager,
  UseAsyncCallback,
  UseAsyncReducerType,
  UseAsyncCallbackContext,
} from './types';

export function useAsync<T = any>(
  callback: UseAsyncCallback<T>,
): UseAsyncManager<T> {
  const myCallback = useRef<UseAsyncCallback<T>>(callback);
  const cancelController = useRef<CancelController>(new CancelController());

  const [state, dispath] = useReducer(reducer, INITIAL_DATA);

  const cancel = useCallback((): void => {
    if (!state.loading) {
      logger.warn('[cancel] useAsync() - The promise is not being running.');
      return;
    }

    cancelController.current.cancel();

    dispath({
      type: UseAsyncReducerType.Cancel,
    });
  }, [state.loading]);

  const context = useMemo<UseAsyncCallbackContext>(
    () => ({
      cancel,
      signal: cancelController.current.signal,
    }),
    [cancel],
  );

  const executePromise = useCallback(
    (): Promise<T | typeof CANCEL_SYMBOL> =>
      new Promise((resolve, reject) => {
        cancelController.current.signal.on(() => {
          resolve(CANCEL_SYMBOL);
        });

        const callbackCalled = myCallback.current(context);

        if (callbackCalled instanceof Promise) {
          callbackCalled
            .then(data => resolve(data))
            .catch(error => reject(error));
          return;
        }

        resolve(callbackCalled);
      }),
    [context],
  );

  const handleCallback = useCallback(async (): Promise<void> => {
    if (!isFunction(myCallback.current)) {
      // Set correct state
      // With this the loading status will be updated
      cancel();

      logger.error('useAsync() - The inserted callback is not a function.');
      return;
    }

    try {
      const data = await executePromise();

      if (data === CANCEL_SYMBOL) {
        return;
      }

      dispath({
        type: UseAsyncReducerType.SetData,
        payload: { data },
      });
    } catch (error) {
      dispath({
        type: UseAsyncReducerType.SetError,
        payload: { error },
      });
    }
  }, [cancel, executePromise]);

  useEffect(() => {
    handleCallback();

    // Prevent that not run more than once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cancel,
    ...state,
  };
}
