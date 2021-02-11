import { useRef, useEffect, useReducer, useCallback } from 'react';

import { isFunction } from '@/utilities/internal/isFunction';
import { logger } from '@/utilities/internal/logger';
import { update } from '@/utilities/internal/object';

import { useLatest } from './useLatest';

import type { AnyThing } from '@/shared/types'; // eslint-disable-line import/order

enum UseAsyncReducerType {
  Cancel = 'CANCEL',
  SetData = 'SET_DATA',
  SetError = 'SET_ERROR',
}

export type UseAsyncCallback<T> = () => AnyThing<T>;

export interface UseAsyncManager<T, E> extends UseAsyncState<T, E> {
  cancel(): void;
}

interface UseAsyncState<T = any, E = any> {
  data?: T;
  error?: E;
  loading: boolean;
}

type CreateAction<T extends string, P = undefined> = P extends undefined
  ? {
      type: T;
    }
  : {
      type: T;
      payload: P;
    };

type UseAsyncReducerAction =
  | CreateAction<UseAsyncReducerType.Cancel>
  | CreateAction<UseAsyncReducerType.SetData, { data: any }>
  | CreateAction<UseAsyncReducerType.SetError, { error: any }>;

export function useAsync<T = any, E = any>(
  callback: UseAsyncCallback<T>,
): UseAsyncManager<T, E> {
  const myCallback = useLatest<UseAsyncCallback<T>>(callback);
  const abortController = useRef<AbortController>(new AbortController());

  const [state, dispath] = useReducer(reducer, INITIAL_DATA);

  const cancel = useCallback(() => {
    abortController.current.abort();

    dispath({
      type: UseAsyncReducerType.Cancel,
    });
  }, []);

  const executePromise = useCallback(
    (): Promise<T | typeof CANCEL_SYMBOL> =>
      new Promise((resolve, reject) => {
        const callbackCalled = myCallback.current();

        if (callbackCalled instanceof Promise) {
          callbackCalled
            .then(data => resolve(data))
            .catch(error => reject(error));
        } else {
          resolve(callbackCalled);
        }

        abortController.current.signal.addEventListener('abort', () => {
          resolve(CANCEL_SYMBOL);
        });
      }),
    [],
  );

  const handleCallback = useCallback(async (): Promise<void> => {
    if (!isFunction(myCallback.current)) {
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
  }, []);

  useEffect(() => {
    handleCallback();
  }, []);

  return {
    cancel,
    ...state,
  };
}

const CANCEL_SYMBOL = Symbol('CANCELLED');
const INITIAL_DATA: UseAsyncState = {
  loading: true,
  data: undefined,
  error: undefined,
};

function reducer(
  state: UseAsyncState,
  action: UseAsyncReducerAction,
): UseAsyncState {
  switch (action.type) {
    case UseAsyncReducerType.Cancel: {
      return update(state, {
        loading: false,
      });
    }
    case UseAsyncReducerType.SetData: {
      return update(state, {
        loading: false,
        data: action.payload.data,
      });
    }
    case UseAsyncReducerType.SetError: {
      return update(state, {
        loading: false,
        error: action.payload.error,
      });
    }
    default: {
      logger.error('[reducer] useAsync() - The type used is invalid.');
      return state;
    }
  }
}
