import { useRef, useEffect, useCallback, RefObject } from 'react';

import { logger } from '@/shared/logger';
import { hasNodeInDOM } from '@/utilities/hasNodeInDOM';
import { isElement } from '@/utilities/isElement';

import type { Listener } from '@/shared/types';

export interface UseOutClickManager<T> {
  ref: RefObject<T>;
  addListener(listener: Listener): void;
  removeListener(listener: Listener): void;
}

export function useOutClick<T extends HTMLElement>(): UseOutClickManager<T> {
  const ref = useRef<T>(null);
  const listeners = useRef<Listener[]>([]);

  const addListener = useCallback((listener: Listener): void => {
    listeners.current.push(listener);
  }, []);

  const removeListener = useCallback((listener: Listener): void => {
    const listenersFiltered = listeners.current.filter(
      currentListener => currentListener !== listener,
    );

    listeners.current.splice(0, listeners.current.length, ...listenersFiltered);
  }, []);

  const handleClick = useCallback((event: MouseEvent): void => {
    const content = ref.current;
    const targetNode = event.target as Node;

    if (!isElement(content)) {
      logger.error('The referenced element is not valid.');
      return;
    }

    if (!hasNodeInDOM(targetNode) || content.contains(targetNode)) {
      return;
    }

    listeners.current.forEach(listener => {
      listener();
    });
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return {
    ref,
    addListener,
    removeListener,
  };
}
