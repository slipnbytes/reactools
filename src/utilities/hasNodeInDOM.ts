import { document } from '@/constants/document';

import type { NodeType } from '@/shared/types';

export function hasNodeInDOM(node: NodeType): boolean {
  return Boolean(document?.contains(node));
}
