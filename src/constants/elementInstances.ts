import { isUndefined } from '@/utilities/internal/isUndefined';

export type ElementInstance = typeof Element | typeof HTMLDocument;

const ELEMENT_INSTANCES = [
  typeof Element !== 'undefined' && Element !== null ? Element : undefined,
  typeof HTMLDocument !== 'undefined' && HTMLDocument !== null
    ? HTMLDocument
    : undefined,
].filter(object => !isUndefined(object));

export const elementInstances = ELEMENT_INSTANCES as ElementInstance[];
