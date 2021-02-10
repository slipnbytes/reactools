import { document } from '@/constants/document';

import type { AcceptedNode } from '@/shared/types';

export function hasNodeInDOM(node: AcceptedNode): boolean {
  return Boolean(document?.contains(node));
}
