import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { Editor, type EditorProps } from "../../components/editor";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import * as icons from "../../components/primitives/icons";
import * as Select from "../../components/primitives/select";

import { indentations } from "./+json-yaml/lib";
import { usePage } from "./+json-yaml/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: toolGroups.converters.tools.jsonYaml.longTitle },
  {
    name: "description",
    content: toolGroups.converters.tools.jsonYaml.description,
  },
  { name: "googlebot", content: "index" },
];

export default function JsonYaml() {
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
        <PageSectionWithControl className="min-h-50 flex-1" title="Json" control={jsonControl}>
          <Editor language="json" value={fields.json} onChange={changeJson} />
        </PageSectionWithControl>
        <PageSectionWithControl className="min-h-50 flex-1" title="Yaml" control={yamlControl}>
          <Editor language="yaml" value={fields.yaml} onChange={changeYaml} />
        </PageSectionWithControl>
      </div>
    </PageRootSection>
  );
}
