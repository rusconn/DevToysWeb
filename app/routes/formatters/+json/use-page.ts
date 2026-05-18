import { useState } from "react";

import { safeJsonParse } from "../../../lib/json";

import { type Indentation, indentations } from "./lib";

export const usePage = () => {
  const [indentation, setIndentation] = useState<Indentation>(indentations.two);
  const [input, setInput] = useState('{\n"foo":"bar"\n}');

  const clearInput = () => {
    setInput("");
  };

  const parsed = safeJsonParse(input);
  const space = indentation === "\t" ? "\t" : Number(indentation);
  const output = parsed.map(x => JSON.stringify(x, null, space)).unwrapOr("");

  return {
    indentation,
    setIndentation,
    input,
    setInput,
    clearInput,
    output,
  };
};
