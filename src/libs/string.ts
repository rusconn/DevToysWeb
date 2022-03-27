import { chunksOf, flatten, intersperse, map, reverse } from "fp-ts/Array";
import { pipe } from "fp-ts/function";

const match = (regex: RegExp) => (x: string) => regex.test(x);

export const isDecimal = match(/^[0-9]*$/);
export const isHexadecimal = match(/^[0-9A-F]*$/i);
export const isOctal = match(/^[0-7]*$/);
export const isBinary = match(/^[0-1]*$/);

const formatNumber = (digits: number, sep: string) => (x: string) =>
  pipe(
    x,
    y => y.split(""),
    reverse,
    chunksOf(digits),
    map(reverse),
    intersperse([sep]),
    reverse,
    flatten,
    xs => xs.join("")
  );

export const formatDecimal = formatNumber(3, ",");
export const formatHexadecimal = formatNumber(4, " ");
export const formatOctal = formatNumber(3, " ");
export const formatBinary = formatNumber(4, " ");

const unformatNumber = (sep: string) => (x: string) => x.replaceAll(sep, "");

export const unformatDecimal = unformatNumber(",");
export const unformatHexadecimal = unformatNumber(" ");
export const unformatOctal = unformatNumber(" ");
export const unformatBinary = unformatNumber(" ");
