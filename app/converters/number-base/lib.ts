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

const match = (regex: RegExp) => regex.test.bind(regex);

const baseConfig = {
  10: { prefix: "", validate: match(/^[0-9]*$/) },
  16: { prefix: "0x", validate: match(/^[0-9A-F]*$/i) },
  8: { prefix: "0o", validate: match(/^[0-7]*$/) },
  2: { prefix: "0b", validate: match(/^[0-1]*$/) },
} as const;

export type Base = keyof typeof baseConfig;

export const toBigInt = (value: string, base: Base) => {
  const { prefix, validate } = baseConfig[base];

  if (validate(value)) {
    return BigInt(`${prefix}${value}`);
  }
};
