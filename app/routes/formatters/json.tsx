import type { ReactNode } from "react";

import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { Editor } from "../../components/editor";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import * as icons from "../../components/primitives/icons";
import * as Select from "../../components/primitives/select";

import { indexMeta } from "../../utils/meta";
import { type Indentation, indentations } from "./+json/lib";
import { usePage } from "./+json/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.formatters.tools.json);
};

export default function Json() {
  const { indentation, setIndentation, input, setInput, clearInput, output } = usePage();

  const indentationConfig = (
    <ConfigurationItem
      icon={<icons.Space size={24} className="-translate-y-1.5" />}
      title="Indentation"
      control={
        <Select.Root
          items={{ "2": "2 spaces", "4": "4 spaces", "\t": "1 tab", "0": "minified" }}
          value={indentation}
          onValueChange={value => setIndentation(value as Indentation)}
        >
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
    <PageRootSection className="h-full" title={toolGroups.formatters.tools.json.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{indentationConfig}</Configuration>
      </PageSection>

      <div className="flex flex-1 flex-col gap-x-4 gap-y-5 lg:flex-row">
        <EditorSection
          title="Input"
          value={input}
          onValueChange={setInput}
          control={inputControl}
        />
        <EditorSection //
          title="Output"
          value={output}
          control={outputControl}
        />
      </div>
    </PageRootSection>
  );
}

type EditorSectionProps = {
  title: string;
  value: string;
  onValueChange?: (value: string) => void;
  control: ReactNode;
};

function EditorSection({ title, value, onValueChange, control }: EditorSectionProps) {
  return (
    <PageSectionWithControl className="min-h-50 flex-1" title={title} control={control}>
      <Editor
        language="json"
        value={value}
        onChange={onValueChange && (value => onValueChange(value ?? ""))}
        options={{ readOnly: onValueChange == null }}
      />
    </PageSectionWithControl>
  );
}
