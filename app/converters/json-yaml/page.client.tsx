"use client";

import { toolGroups } from "../../_config/tools";
import * as icons from "../../_components/primitives/icons";
import * as Select from "../../_components/primitives/select";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { Editor, type EditorProps } from "../../_components/editor";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { indentations } from "./lib";
import { usePage } from "./use-page";

export default function ClientBoundary() {
  const { fields, setFieldsByJson, setFieldsByYaml, clearFields, changeIndentation } = usePage();

  const changeJson: EditorProps["onChange"] = value => {
    setFieldsByJson(value ?? "");
  };
  const changeYaml: EditorProps["onChange"] = value => {
    setFieldsByYaml(value ?? "");
  };

  const indentationConfig = (
    <ConfigurationItem
      icon={<icons.Space size={24} className="-translate-y-1.5" />}
      title="Indentation"
      control={
        <Select.Root value={fields.indentation} onValueChange={changeIndentation}>
          <Select.Trigger aria-label="toggle open/close state of indentation selection">
            <Select.Value placeholder={fields.indentation} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={indentations.two}>2 spaces</Select.Item>
            <Select.Item value={indentations.four}>4 spaces</Select.Item>
          </Select.Content>
        </Select.Root>
      }
    />
  );

  const clearButton = (
    <Button.Clear onClick={clearFields} iconOnly aria-label="clear json and yaml" />
  );

  const jsonControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFieldsByJson} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File
          accept=".json"
          onFileRead={setFieldsByJson}
          iconOnly
          aria-label="load a json file"
        />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={fields.json} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );
  const yamlControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFieldsByYaml} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File
          accept=".yml,.yaml"
          onFileRead={setFieldsByYaml}
          iconOnly
          aria-label="load a yaml file"
        />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={fields.yaml} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection className="h-full" title={toolGroups.converters.tools.jsonYaml.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{indentationConfig}</Configuration>
      </PageSection>
      <div className="flex flex-1 flex-col gap-x-4 gap-y-5 lg:flex-row">
        <PageSection className="min-h-[200px] flex-1" title="Json" control={jsonControl}>
          <Editor language="json" value={fields.json} onChange={changeJson} />
        </PageSection>
        <PageSection className="min-h-[200px] flex-1" title="Yaml" control={yamlControl}>
          <Editor language="yaml" value={fields.yaml} onChange={changeYaml} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
