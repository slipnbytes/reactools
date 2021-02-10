import { elementInstances } from '@/constants/elementInstances';
import { isUndefinedOrNull } from '@/utilities/internal/isUndefinedOrNull';

import type { AcceptedNode } from '@/shared/types';

// Adapted implementation
// See -> https://stackoverflow.com/a/36894871
export function isElement(element: AcceptedNode): element is Element {
  if (isUndefinedOrNull(element)) {
    return false;
  }

  return (
    elementInstances.some(Instance => element instanceof Instance) ||
    (element.nodeType === 1 && typeof element.nodeName === 'string')
  );
}
