/**
 * Central index for all program content across locales.
 * Merges content from multiple files and provides a lookup function.
 */
import { ProgramContent } from './programContentTypes';
import { programContentTR1 } from './programContent_tr_1';
import { programContentTR2 } from './programContent_tr_2';
import { programContentEN1 } from './programContent_en_1';
import { programContentEN2 } from './programContent_en_2';
import { programContentDE1 } from './programContent_de_1';
import { programContentDE2 } from './programContent_de_2';
import { programContentRU1 } from './programContent_ru_1';
import { programContentRU2 } from './programContent_ru_2';

// Merge TR content
const allContentTR: Record<string, ProgramContent> = {
  ...programContentTR1,
  ...programContentTR2,
};

// Merge EN content
const allContentEN: Record<string, ProgramContent> = {
  ...programContentEN1,
  ...programContentEN2,
};

// Merge DE content
const allContentDE: Record<string, ProgramContent> = {
  ...programContentDE1,
  ...programContentDE2,
};

// Merge RU content
const allContentRU: Record<string, ProgramContent> = {
  ...programContentRU1,
  ...programContentRU2,
};

const contentByLocale: Record<string, Record<string, ProgramContent>> = {
  tr: allContentTR,
  en: allContentEN,
  de: allContentDE,
  ru: allContentRU,
};

export function getProgramContent(slug: string, locale: string): ProgramContent | null {
  const localeContent = contentByLocale[locale] || contentByLocale['tr'];
  return localeContent[slug] || null;
}
