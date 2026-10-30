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
import { indentations } from "./+json-yaml/lib";
import { usePage } from "./+json-yaml/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.converters.tools.jsonYaml);
};

export default function JsonYaml() {
  const { fields, setFieldsByJson, setFieldsByYaml, changeIndentation } = usePage();

  const indentationConfig = (
    <ConfigurationItem
      icon={<icons.Space size={24} className="-translate-y-1.5" />}
      title="Indentation"
      control={
        <Select.Root
          items={{ "2": "2 spaces", "4": "4 spaces" }}
          value={fields.indentation}
          onValueChange={v => v && changeIndentation(v)}
        >
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

  return (
    <PageRootSection className="h-full" title={toolGroups.converters.tools.jsonYaml.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{indentationConfig}</Configuration>
      </PageSection>

      <div className="flex flex-1 flex-col gap-x-4 gap-y-5 lg:flex-row">
        <LanguageSection
          title="Json"
          language="json"
          value={fields.json}
          onValueChange={setFieldsByJson}
          acceptFiles=".json"
        />
        <LanguageSection
          title="Yaml"
          language="yaml"
          value={fields.yaml}
          onValueChange={setFieldsByYaml}
          acceptFiles=".yml,.yaml"
        />
      </div>
    </PageRootSection>
  );
}

type LanguageSectionProps = {
  title: string;
  language: string;
  value: string;
  onValueChange: (value: string) => void;
  acceptFiles: string;
};

function LanguageSection({
  title,
  language,
  value,
  onValueChange,
  acceptFiles,
}: LanguageSectionProps) {
  const control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={onValueChange} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File
          accept={acceptFiles}
          onFileRead={onValueChange}
          iconOnly
          aria-label={`load a ${language} file`}
        />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={value} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={() => onValueChange("")} iconOnly aria-label={`clear ${language}`} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageSectionWithControl className="min-h-50 flex-1" title={title} control={control}>
      <Editor language={language} value={value} onChange={value => onValueChange(value ?? "")} />
    </PageSectionWithControl>
  );
}
