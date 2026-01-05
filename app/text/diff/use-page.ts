import { useState } from "react";

import { PANEL_FULL_SIZE, VERTICAL_PANEL_MAX_SIZE } from "./config";

export const usePage = () => {
  const [input1, setInput1] = useState<string | undefined>("Hello world");
  const [input2, setInput2] = useState<string | undefined>("Hello, World!");
  const [diffFullHeight, setDiffFullHeight] = useState(false);
  const [inlineMode, setInlineMode] = useState(false);
  const diffPanelMaxSize = diffFullHeight ? PANEL_FULL_SIZE : VERTICAL_PANEL_MAX_SIZE;

  const clearInput1 = () => {
    setInput1("");
  };
  const clearInput2 = () => {
    setInput2("");
  };
  const toggleFullHeight = () => {
    setDiffFullHeight(prev => !prev);
  };

  return {
    input1,
    setInput1,
    clearInput1,
    input2,
    setInput2,
    clearInput2,
    diffFullHeight,
    inlineMode,
    setInlineMode,
    diffPanelMaxSize,
    toggleFullHeight,
  };
};
