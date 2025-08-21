
import english from './_locales/english.json';
import portuguese from './_locales/portuguese.json';

export type Language = 'en' | 'pt';

type TranslationObject = typeof english;
export type TranslationKeys = keyof TranslationObject;

export const languages: Record<Language, string> = {
  en: 'English',
  pt: 'Português',
};

export const translations = {
  en: english,
  pt: portuguese,
};

export const defaultLanguage: Language = 'en';
