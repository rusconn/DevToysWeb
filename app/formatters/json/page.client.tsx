"use client";

import { useState } from "react";

import { toolGroups } from "../../_config/tools";
import { safeJsonParse } from "../../_lib/json";
import * as icons from "../../_components/primitives/icons";
import * as Select from "../../_components/primitives/select";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { Editor, EditorProps } from "../../_components/editor";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import styles from "./page.client.module.css";

const indentations = {
  two: "2",
  four: "4",
  zero: "0",
  tab: "\t",
};

export default function ClientBoundary() {
  const [indentation, setIndentation] = useState(indentations.two);
  const [input, setInput] = useState('{\n"foo":"bar"\n}');

  const parsed = safeJsonParse(input);
  const space = indentation === "\t" ? "\t" : parseInt(indentation, 10);
  const output = parsed.map(x => JSON.stringify(x, null, space)).unwrapOr("");

  const clearInput = () => setInput("");

  const onJsonChange: EditorProps["onChange"] = value => setInput(value ?? "");

  const indentationConfig = (
    <ConfigurationItem
      icon={<icons.Space size={24} style={{ transform: "translateY(-0.375rem)" }} />}
      title="Indentation"
      control={
        <Select.Root value={indentation} onValueChange={setIndentation}>
          <Select.Trigger aria-label="toggle open/close state of indentation selection">
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

  const inputControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setInput} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File accept=".json" onFileRead={setInput} iconOnly aria-label="load a json file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearInput} iconOnly aria-label="clear json" />
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
    <PageRootSection size="fullHeight" title={toolGroups.formatters.tools.json.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{indentationConfig}</Configuration>
      </PageSection>
      <div className={styles["input-output-container"]}>
        <PageSection size="fullHeight" title="Input" control={inputControl}>
          <Editor language="json" value={input} onChange={onJsonChange} />
        </PageSection>
        <PageSection size="fullHeight" title="Output" control={outputControl}>
          <Editor language="json" value={output} options={{ readOnly: true }} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
