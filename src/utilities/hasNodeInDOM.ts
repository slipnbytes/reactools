import { document } from '@/constants/document';

export function hasNodeInDOM(node: Node | null): boolean {
  return Boolean(document?.contains(node));
}
