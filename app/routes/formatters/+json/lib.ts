export const indentations = {
  two: "2",
  four: "4",
  zero: "0",
  tab: "\t",
} as const;

export type Indentation = (typeof indentations)[keyof typeof indentations];
