import type { CancelSignal } from './CancelSignal';

import type { AnyThing } from '@/shared/types';

export type UseAsyncCallback<T> = (
  context: UseAsyncCallbackContext,
) => AnyThing<T>;

export interface UseAsyncCallbackContext {
  cancel(): void;
  signal: CancelSignal;
}

export interface UseAsyncManager<T> extends UseAsyncState<T> {
  cancel(): void;
}

export interface UseAsyncState<T = any> {
  data?: T;
  error?: any;
  loading: boolean;
}

/* Reducer */

export enum UseAsyncReducerType {
  Cancel = 'CANCEL',
  SetData = 'SET_DATA',
  SetError = 'SET_ERROR',
}

type CreateAction<T extends string, P = undefined> = P extends undefined
  ? {
      type: T;
    }
  : {
      type: T;
      payload: P;
    };

export type UseAsyncReducerAction =
  | CreateAction<UseAsyncReducerType.Cancel>
  | CreateAction<UseAsyncReducerType.SetData, { data: any }>
  | CreateAction<UseAsyncReducerType.SetError, { error: any }>;
