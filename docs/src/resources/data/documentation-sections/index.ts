import { contributing } from './contributing';
import { guides } from './guides';
import { helpers } from './helpers';
import { hooks } from './hooks';
import { start } from './start';
import type { Section } from './types';

export const documentationSections: Section[] = [
  start,
  guides,
  hooks,
  helpers,
  contributing,
];
