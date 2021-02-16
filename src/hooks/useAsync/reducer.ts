import { logger } from '@/shared/logger';
import { update } from '@/utilities/internal/object';

import {
  UseAsyncState,
  UseAsyncReducerType,
  UseAsyncReducerAction,
} from './types';

export function reducer(
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
    /* istanbul ignore next */
    default: {
      logger.error('[reducer] useAsync() - The type used is invalid.');
      return state;
    }
  }
}
