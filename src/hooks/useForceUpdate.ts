import { useState, useCallback } from 'react';

export type UseForceUpdateManager = () => void;

// This hook is an implementation used by mobx
// See -> https://github.com/mobxjs/mobx/blob/5640aa7794420a5fc2f99ac0819de11696d6ba71/packages/mobx-react-lite/src/utils/utils.ts#L5
export function useForceUpdate(): UseForceUpdateManager {
  const [, setTick] = useState(0);

  const update = useCallback((): void => {
    setTick(tick => tick + 1);
  }, []);

  return update;
}
