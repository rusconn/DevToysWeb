import * as changeCase from "change-case";

export function countWords(text: string): number {
  return words(text).length;
}

function words(text: string): string[] {
  return text.match(/[^\s\p{P}]+/gu) ?? [];
}

export function countCharacters(text: string): number {
  // if '👨‍👩‍👧‍👦' should be 1 instead of 7, add a configuration
  return [...text].length;
}

export function countLines(text: string): number {
  return text.split("\n").length;
}

export function countBytes(text: string): number {
  return new TextEncoder().encode(text).length;
}

export enum TextTransformMode {
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
}

export const textTransformModes = Object.values(TextTransformMode);

export const modeTitle = {
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
};

// FIXME: characters such as punctuations are not preserved
export function transformText(text: string, mode: TextTransformMode) {
  switch (mode) {
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

    default:
      throw new Error(mode satisfies never);
  }
}
