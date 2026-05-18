"use client";

import { toolGroups } from "../../config/tools";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import { Textarea, type TextareaProps } from "../../components/primitives/textarea";
import { ToggleGroup, ToggleGroupItem } from "../../components/primitives/toggle-group";

import { pageTitle } from "../../utils/title";
import { modeTitle, TextTransformMode, textTransformModes } from "./+inspector/lib";
import { usePage } from "./+inspector/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: pageTitle(toolGroups.text.tools.inspector_and_case_converter.longTitle) },
  {
    name: "description",
    content: toolGroups.text.tools.inspector_and_case_converter.description,
  },
  { name: "googlebot", content: "index" },
];

export default function Inspector() {
  const { input, setInput, clearInput, mode, setMode, output, stats } = usePage();

  const changeInput: TextareaProps["onChange"] = e => {
    setInput(e.currentTarget.value);
  };

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
        <PageSectionWithControl className="min-h-50 flex-1" title="Input" control={inputControl}>
          <Textarea value={input} onChange={changeInput} rows={10} />
        </PageSectionWithControl>
        <PageSectionWithControl className="min-h-50 flex-1" title="Output" control={outputControl}>
          <Textarea value={output} rows={10} readOnly />
        </PageSectionWithControl>
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
