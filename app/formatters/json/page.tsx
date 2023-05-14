"use client";

import { useCallback, useMemo, useState } from "react";

import { toolGroups } from "@/config/tools";
import { Editor, EditorProps } from "@/components/ui/editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClearButton } from "@/components/buttons/clear";
import { CopyButton } from "@/components/buttons/copy";
import { FileButton } from "@/components/buttons/file";
import { PasteButton } from "@/components/buttons/paste";
import { Configuration } from "@/components/configuration";
import { Configurations } from "@/components/configurations";
import { ControlMenu } from "@/components/control-menu";
import { icons } from "@/components/icons";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

const two = "  ";
const four = "    ";
const zero = "";
const tab = "\t";

export default function Page() {
  const [indentation, setIndentation] = useState(two);
  const [input, setInput] = useState('{\n"foo":"bar"\n}');

  let output: string;
  try {
    const parsed = JSON.parse(input) as unknown;
    output = JSON.stringify(parsed, null, indentation);
  } catch {
    output = "";
  }

  const clearInput = useCallback(() => setInput(""), []);

  const onJsonChange: EditorProps["onChange"] = value => setInput(value ?? "");

  const indentationIcon = useMemo(() => <icons.Space size={24} className="-translate-y-1.5" />, []);

  const indentationConfig = useMemo(
    () => (
      <Configuration
        icon={indentationIcon}
        title="Indentation"
        control={
          <Select value={indentation} onValueChange={setIndentation}>
            <SelectTrigger
              className="w-28"
              aria-label="toggle open/close state of indentation selection"
            >
              <SelectValue placeholder={indentation} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={two}>2 spaces</SelectItem>
              <SelectItem value={four}>4 spaces</SelectItem>
              <SelectItem value={tab}>1 tab</SelectItem>
              <SelectItem value={zero}>minified</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    ),
    [indentation, indentationIcon]
  );

  const inputPasteButton = useMemo(() => <PasteButton onClipboardRead={setInput} />, []);

  const inputFileButton = useMemo(
    () => (
      <FileButton accept=".json" onFileRead={setInput} iconOnly aria-label="load a json file" />
    ),
    []
  );

  const inputClearButton = useMemo(
    () => <ClearButton onClick={clearInput} iconOnly aria-label="clear json" />,
    [clearInput]
  );

  const outputCopyButton = useMemo(() => <CopyButton text={output} />, [output]);

  const inputControl = <ControlMenu list={[inputPasteButton, inputFileButton, inputClearButton]} />;
  const outputControl = <ControlMenu list={[outputCopyButton]} />;

  return (
    <PageRootSection
      className="flex h-full flex-col"
      title={toolGroups.formatters.tools.json.longTitle}
    >
      <PageSection className="mt-0" title="Configuration">
        <Configurations list={[indentationConfig]} />
      </PageSection>
      <div className="flex flex-1 flex-col gap-x-4 gap-y-5 lg:flex-row">
        <PageSection className="min-h-[200px] flex-1" title="Input" control={inputControl}>
          <Editor language="json" value={input} onChange={onJsonChange} />
        </PageSection>
        <PageSection className="min-h-[200px] flex-1" title="Output" control={outputControl}>
          <Editor language="json" value={output} options={{ readOnly: true }} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
