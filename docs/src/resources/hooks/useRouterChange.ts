import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useRouterChange(listener: () => any): void {
  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeComplete', listener);

    return () => {
      events.off('routeChangeComplete', listener);
    };
  }, [events, listener]);
}
