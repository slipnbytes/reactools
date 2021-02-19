import { useContext } from 'react';

import { Context, ContextData } from '@components/layout/UI';

export function useUI(): ContextData {
  const data = useContext<ContextData>(Context);

  return data;
}
