import { chunksOf, intersperse } from "fp-ts/Array";

const match = (regex: RegExp) => (x: string) => regex.test(x);

export const isDecimal = match(/^[0-9]*$/);
export const isHexadecimal = match(/^[0-9A-F]*$/i);
export const isOctal = match(/^[0-7]*$/);
export const isBinary = match(/^[0-1]*$/);

const formatNumber = (digits: number, sep: string) => (s: string) => {
  const a = [...s].reverse();
  const b = chunksOf(digits)(a);
  const c = intersperse([sep])(b);
  return c.flat().reverse().join("");
};

export const formatDecimal = formatNumber(3, ",");
export const formatHexadecimal = formatNumber(4, " ");
export const formatOctal = formatNumber(3, " ");
export const formatBinary = formatNumber(4, " ");

export const unformatNumber = (x: string) => x.replaceAll(/[ ,]/g, "");

export function noOp() {}
