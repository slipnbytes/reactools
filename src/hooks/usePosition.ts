import { useRef, useState, useEffect, useCallback, RefObject } from 'react';

import { logger } from '@/shared/logger';
import { isElement } from '@/utilities/isElement';

export interface UsePositionManager<T> extends UsePositionRect {
  ref: RefObject<T>;
}

export interface UsePositionRect {
  y: number;
  x: number;
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export function usePosition<T extends HTMLElement>(): UsePositionManager<T> {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<UsePositionRect>(INITIAL_POSITION);

  const getBoundingClientRect = useCallback((): DOMRect | null => {
    const element = ref.current;

    if (!isElement(element)) {
      logger.error('usePosition() - The referenced element is not valid.');
      return null;
    }

    return element.getBoundingClientRect();
  }, []);

  const getAndSetRect = useCallback((): void => {
    const newRect = getBoundingClientRect();

    if (!newRect) {
      return;
    }

    setRect(newRect.toJSON());
  }, [getBoundingClientRect]);

  useEffect(() => {
    getAndSetRect();
  }, []);

  useEffect(() => {
    window.addEventListener('load', getAndSetRect);
    window.addEventListener('resize', getAndSetRect);

    return () => {
      window.removeEventListener('load', getAndSetRect);
      window.removeEventListener('resize', getAndSetRect);
    };
  }, [getAndSetRect]);

  return {
    ref,
    ...rect,
  };
}

const INITIAL_POSITION: UsePositionRect = {
  y: 0,
  x: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
