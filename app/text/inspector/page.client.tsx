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

  const changeInput: TextareaProps["onChange"] = e => setInput(e.currentTarget.value);

  const tryChangeMode = (value: string) => {
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
        <ToggleGroup type="single" value={mode} onValueChange={tryChangeMode}>
          {textTransformModes.map(m => (
            <ToggleGroupItem key={m} value={m}>
              {modeTitle[m]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PageSection>

      <div className="flex flex-1 flex-col gap-x-4 gap-y-5 lg:flex-row">
        <PageSection className="min-h-[200px] flex-1" title="Input" control={inputControl}>
          <Textarea value={input} onChange={changeInput} rows={10} />
        </PageSection>
        <PageSection className="min-h-[200px] flex-1" title="Output" control={outputControl}>
          <Textarea value={output} rows={10} readOnly />
        </PageSection>
      </div>

      <PageSection className="flex-1" title="Information">
        <div className="grid max-w-sm grid-cols-2 gap-x-4">
          Characters: <span className="font-mono">{stats.characters}</span>
          Words: <span className="font-mono">{stats.words}</span>
          Lines: <span className="font-mono">{stats.lines}</span>
          Bytes: <span className="font-mono">{stats.bytes}</span>
        </div>
      </PageSection>
    </PageRootSection>
  );
}
