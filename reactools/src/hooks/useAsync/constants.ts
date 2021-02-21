import { UseAsyncState } from './types';

export const CANCEL_SYMBOL = Symbol('CANCELLED');

export const INITIAL_DATA: UseAsyncState = {
  loading: true,
  data: undefined,
  error: undefined,
};
