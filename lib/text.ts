import * as changeCase from "change-case";
import { convert as slugify } from "url-slug";

export function countWords(text: string): number {
  // Split the text by any whitespace (spaces, newlines, tabs, etc.)
  const words = text.split(/\s+/);
  // Filter out any empty strings in case there are extra spaces or newlines
  const filteredWords = words.filter(word => word.length > 0);
  return filteredWords.length;
}

export function countCharacters(text: string): number {
  /** Unicode-proof way to get string length in codepoints (in characters)
   For example:
   const text = '👨‍👩‍👧‍👦';
   text.length === 11;
   [...new Intl.Segmenter().segment(text)].length === 1;
   */
  return [...new Intl.Segmenter().segment(text)].length;
}

export function countLines(text: string): number {
  return text.split("\n").length;
}

export function countBytes(text: string): number {
  return new Blob([text]).size;
}

export enum TextTransformMode {
  original = "original",
  sentenceCase = "sentenceCase",
  lowerCase = "lowerCase",
  upperCase = "upperCase",
  titleCase = "titleCase",
  camelCase = "camelCase",
  pascalCase = "pascalCase",
  snakeCase = "snakeCase",
  kebabCase = "kebabCase",
  constantCase = "constantCase",
  cobolCase = "cobolCase",
  trainCase = "trainCase",
  urlSlugify = "urlSlugify",
}

export const textTransformModes = Object.values(TextTransformMode);

export const modeTitle = {
  [TextTransformMode.original]: "OriginalCase",
  [TextTransformMode.upperCase]: "UPPER CASE",
  [TextTransformMode.sentenceCase]: "Sentence case",
  [TextTransformMode.lowerCase]: "lower case",
  [TextTransformMode.titleCase]: "Title Case",
  [TextTransformMode.camelCase]: "camelCase",
  [TextTransformMode.pascalCase]: "PascalCase",
  [TextTransformMode.snakeCase]: "snake_case",
  [TextTransformMode.kebabCase]: "kebab-case",
  [TextTransformMode.constantCase]: "CONSTANT_CASE",
  [TextTransformMode.cobolCase]: "COBOL-CASE",
  [TextTransformMode.trainCase]: "Train-Case",
  [TextTransformMode.urlSlugify]: "url-slufigy",
};

export function transformText(text: string, mode: TextTransformMode) {
  switch (mode) {
    case TextTransformMode.original:
      return text;
    case TextTransformMode.upperCase:
      return text.toUpperCase();
    case TextTransformMode.sentenceCase:
      return changeCase.sentenceCase(text);
    case TextTransformMode.lowerCase:
      return text.toLowerCase();
    case TextTransformMode.titleCase:
      return changeCase.capitalCase(text);
    case TextTransformMode.camelCase:
      return changeCase.camelCase(text);
    case TextTransformMode.pascalCase:
      return changeCase.pascalCase(text);
    case TextTransformMode.kebabCase:
      return changeCase.kebabCase(text);
    case TextTransformMode.snakeCase:
      return changeCase.snakeCase(text);
    case TextTransformMode.cobolCase:
      return changeCase.constantCase(text, { delimiter: "-" });
    case TextTransformMode.constantCase:
      return changeCase.constantCase(text);
    case TextTransformMode.trainCase:
      return changeCase.trainCase(text);
    case TextTransformMode.urlSlugify:
      return slugify(text);

    default:
      return text;
  }
}
