import { useState } from "react";

import {
  formatBinary,
  formatDecimal,
  formatHexadecimal,
  formatOctal,
  toBigInt,
  unformatNumber,
  type Base,
} from "./lib";

export const usePage = () => {
  const [format, setFormat] = useState(true);
  const [int, setInt] = useState<bigint | undefined>(BigInt(42));

  const trySetInt = (base: Base) => (value: string) => {
    if (value === "") {
      setInt(undefined);
      return;
    }

    const unformatted = unformatNumber(value);
    const int = toBigInt(unformatted, base);

    if (int != null) {
      setInt(int);
    }
  };

  const newDec = int?.toString(10) ?? "";
  const dec = format ? formatDecimal(newDec) : newDec;
  const trySetDec = trySetInt(10);

  const newHex = int?.toString(16).toUpperCase() ?? "";
  const hex = format ? formatHexadecimal(newHex) : newHex;
  const trySetHex = trySetInt(16);

  const newOct = int?.toString(8) ?? "";
  const oct = format ? formatOctal(newOct) : newOct;
  const trySetOct = trySetInt(8);

  const newBin = int?.toString(2) ?? "";
  const bin = format ? formatBinary(newBin) : newBin;
  const trySetBin = trySetInt(2);

  return {
    format,
    setFormat,
    dec,
    trySetDec,
    hex,
    trySetHex,
    oct,
    trySetOct,
    bin,
    trySetBin,
  };
};
