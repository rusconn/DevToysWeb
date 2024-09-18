const match = (regex: RegExp) => (x: string) => regex.test(x);

export const isDecimal = match(/^[0-9]*$/);
export const isHexadecimal = match(/^[0-9A-F]*$/i);
export const isOctal = match(/^[0-7]*$/);
export const isBinary = match(/^[0-1]*$/);

const formatNumber = (digits: number, sep: string) => (s: string) => {
  const head = ((s.length - 1) % digits) + 1;
  const buf = [];

  buf.push(s.substring(0, head));

  for (let i = head; i < s.length; i += digits) {
    buf.push(sep, s.substring(i, i + digits));
  }

  return buf.join("");
};

export const formatDecimal = formatNumber(3, ",");
export const formatHexadecimal = formatNumber(4, " ");
export const formatOctal = formatNumber(3, " ");
export const formatBinary = formatNumber(4, " ");

export const unformatNumber = (x: string) => x.replaceAll(/[ ,]/g, "");
