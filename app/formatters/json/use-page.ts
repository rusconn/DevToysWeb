import { useState } from "react";

import { safeJsonParse } from "../../_lib/json";

import { indentations, type Indentation } from "./lib";

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
