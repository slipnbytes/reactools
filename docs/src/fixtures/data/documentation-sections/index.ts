import { guides } from './guides';
import { contributing } from './contributing';
import { hooks } from './hooks';
import { helpers } from './helpers';
import { start } from './start';
import type { Section } from './types';

export const documentationSections: Section[] = [
  start,
  guides,
  hooks,
  helpers,
  contributing,
];
