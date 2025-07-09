"use client";

import { useState } from "react";

import { toolGroups } from "../../_config/tools";
import { Textarea, TextareaProps } from "../../_components/primitives/textarea";
import { ToggleGroup, ToggleGroupItem } from "../../_components/primitives/toggle-group";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import {
  countBytes,
  countCharacters,
  countLines,
  countWords,
  modeTitle,
  TextTransformMode,
  textTransformModes,
  transformText,
} from "./lib";

import styles from "./page.client.module.css";

export default function ClientBoundary() {
  const [input, setInput] = useState("ConvertMe");
  const [mode, setMode] = useState(TextTransformMode.sentenceCase);

  const output = transformText(input, mode);

  const stats = {
    characters: countCharacters(input),
    words: countWords(input),
    lines: countLines(input),
    bytes: countBytes(input),
  };

  const clearInput = () => setInput("");

  const onInputChange: TextareaProps["onChange"] = e => setInput(e.currentTarget.value);
  const onModeChange = (value: string) => {
    if (value && value in TextTransformMode) {
      setMode(value as TextTransformMode);
    }
  };

  const inputControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setInput} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setInput} iconOnly aria-label="load a file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearInput} iconOnly aria-label="clear input" />
      </ControlMenuItem>
    </ControlMenu>
  );
  const outputControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={output} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.text.tools.inspector_and_case_converter.longTitle}>
      <PageSection title="Convert">
        <ToggleGroup type="single" value={mode} onValueChange={onModeChange}>
          {textTransformModes.map(m => (
            <ToggleGroupItem key={m} value={m}>
              {modeTitle[m]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PageSection>

      <div className={styles["input-output-container"]}>
        <PageSection size="fullHeight" title="Input" control={inputControl}>
          <Textarea value={input} onChange={onInputChange} rows={10} />
        </PageSection>
        <PageSection size="fullHeight" title="Output" control={outputControl}>
          <Textarea value={output} rows={10} readOnly />
        </PageSection>
      </div>

      <PageSection title="Information">
        <div className={styles.information}>
          Characters: <span className={styles["font-mono"]}>{stats.characters}</span>
          Words: <span className={styles["font-mono"]}>{stats.words}</span>
          Lines: <span className={styles["font-mono"]}>{stats.lines}</span>
          Bytes: <span className={styles["font-mono"]}>{stats.bytes}</span>
        </div>
      </PageSection>
    </PageRootSection>
  );
}
