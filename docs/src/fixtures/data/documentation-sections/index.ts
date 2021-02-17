import { api } from './api';
import { guides } from './guides';
import { information } from './information';
import type { Section } from './types';

export const documentationSections: Section[] = [api, information, guides];
