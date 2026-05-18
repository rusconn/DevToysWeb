import { useState } from "react";

import {
  countBytes,
  countCharacters,
  countLines,
  countWords,
  TextTransformMode,
  transformText,
} from "./lib";

export const usePage = () => {
  const [input, setInput] = useState("ConvertMe");
  const [mode, setMode] = useState(TextTransformMode.sentenceCase);

  const clearInput = () => {
    setInput("");
  };

  const output = transformText(input, mode);

  const stats = {
    characters: countCharacters(input),
    words: countWords(input),
    lines: countLines(input),
    bytes: countBytes(input),
  };

  return {
    input,
    setInput,
    clearInput,
    mode,
    setMode,
    output,
    stats,
  };
};
