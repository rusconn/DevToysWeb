"use client";

import { useCallback, useMemo, useState } from "react";

import { toolGroups } from "@/config/tools";
import { safeJsonParse } from "@/lib/json";
import { Editor, EditorProps } from "@/components/ui/editor";
import * as Select from "@/components/ui/select";
import * as Button from "@/components/buttons";
import { Configuration } from "@/components/configuration";
import { Configurations } from "@/components/configurations";
import { ControlMenu } from "@/components/control-menu";
import * as icons from "@/components/icons";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

const indentations = {
  two: "  ",
  four: "    ",
  zero: "",
  tab: "\t",
};

export default function Page() {
  const [indentation, setIndentation] = useState(indentations.two);
  const [input, setInput] = useState('{\n"foo":"bar"\n}');

  const parsed = useMemo(() => safeJsonParse(input), [input]);
  const output = parsed.map(x => JSON.stringify(x, null, indentation)).unwrapOr("");

  const clearInput = useCallback(() => setInput(""), []);

  const onJsonChange: EditorProps["onChange"] = value => setInput(value ?? "");

  const indentationConfig = (
    <Configuration
      icon={<icons.Space size={24} className="-translate-y-1.5" />}
      title="Indentation"
      control={
        <Select.Root value={indentation} onValueChange={setIndentation}>
          <Select.Trigger
            className="w-28"
            aria-label="toggle open/close state of indentation selection"
          >
            <Select.Value placeholder={indentation} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={indentations.two}>2 spaces</Select.Item>
            <Select.Item value={indentations.four}>4 spaces</Select.Item>
            <Select.Item value={indentations.tab}>1 tab</Select.Item>
            <Select.Item value={indentations.zero}>minified</Select.Item>
          </Select.Content>
        </Select.Root>
      }
    />
  );

  const inputPasteButton = <Button.Paste onClipboardRead={setInput} />;

  const inputFileButton = (
    <Button.File accept=".json" onFileRead={setInput} iconOnly aria-label="load a json file" />
  );

  const inputClearButton = <Button.Clear onClick={clearInput} iconOnly aria-label="clear json" />;

  const outputCopyButton = <Button.Copy text={output} />;

  const inputControl = <ControlMenu list={[inputPasteButton, inputFileButton, inputClearButton]} />;
  const outputControl = <ControlMenu list={[outputCopyButton]} />;

  return (
    <PageRootSection className="h-full" title={toolGroups.formatters.tools.json.longTitle}>
      <PageSection title="Configuration">
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
