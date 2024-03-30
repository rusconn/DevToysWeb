"use client";

import { useCallback, useState } from "react";
import yaml from "js-yaml";

import { toolGroups } from "@/config/tools";
import { safeJsonParse } from "@/lib/json";
import { safeYamlParse } from "@/lib/yaml";
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
};

export default function Page() {
  const [form, setForm] = useState({
    indentation: indentations.two,
    json: '{\n  "foo": "bar"\n}',
    yaml: "foo: bar",
  });

  const setFormByJson = useCallback((text: string) => {
    setForm(prev => ({
      ...prev,
      json: text,
      yaml: safeJsonParse(text)
        .map(x => yaml.dump(x, { indent: prev.indentation.length, quotingType: '"' }))
        .unwrapOr(""),
    }));
  }, []);

  const setFormByYaml = useCallback((text: string) => {
    setForm(prev => ({
      ...prev,
      json: safeYamlParse(text)
        .map(x => JSON.stringify(x, null, prev.indentation))
        .unwrapOr(""),
      yaml: text,
    }));
  }, []);

  const clearBoth = useCallback(() => {
    setForm(prev => ({
      ...prev,
      json: "",
      yaml: "",
    }));
  }, []);

  const onIndentationChange: Select.Props["onValueChange"] = value => {
    const jsonYaml = safeJsonParse(form.json)
      .map(x => ({
        json: JSON.stringify(x, null, value),
        yaml: yaml.dump(x, { indent: value.length, quotingType: '"' }),
      }))
      .unwrapOr({
        json: "",
        yaml: "",
      });

    setForm({
      indentation: value,
      ...jsonYaml,
    });
  };

  const onJsonChange: EditorProps["onChange"] = value => setFormByJson(value ?? "");
  const onYamlChange: EditorProps["onChange"] = value => setFormByYaml(value ?? "");

  const indentationConfig = (
    <Configuration
      icon={<icons.Space size={24} className="-translate-y-1.5" />}
      title="Indentation"
      control={
        <Select.Root value={form.indentation} onValueChange={onIndentationChange}>
          <Select.Trigger
            className="w-28"
            aria-label="toggle open/close state of indentation selection"
          >
            <Select.Value placeholder={form.indentation} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={indentations.two}>2 spaces</Select.Item>
            <Select.Item value={indentations.four}>4 spaces</Select.Item>
          </Select.Content>
        </Select.Root>
      }
    />
  );

  const jsonPasteButton = <Button.Paste onClipboardRead={setFormByJson} />;
  const yamlPasteButton = <Button.Paste onClipboardRead={setFormByYaml} />;

  const jsonFileButton = (
    <Button.File accept=".json" onFileRead={setFormByJson} iconOnly aria-label="load a json file" />
  );
  const yamlFileButton = (
    <Button.File
      accept=".yml,.yaml"
      onFileRead={setFormByYaml}
      iconOnly
      aria-label="load a yaml file"
    />
  );

  const jsonCopyButton = <Button.Copy text={form.json} />;
  const yamlCopyButton = <Button.Copy text={form.yaml} />;

  const clearButton = (
    <Button.Clear onClick={clearBoth} iconOnly aria-label="clear json and yaml" />
  );

  const jsonControl = (
    <ControlMenu list={[jsonPasteButton, jsonFileButton, jsonCopyButton, clearButton]} />
  );
  const yamlControl = (
    <ControlMenu list={[yamlPasteButton, yamlFileButton, yamlCopyButton, clearButton]} />
  );

  return (
    <PageRootSection className="h-full" title={toolGroups.converters.tools.jsonYaml.longTitle}>
      <PageSection title="Configuration">
        <Configurations list={[indentationConfig]} />
      </PageSection>
      <div className="flex flex-1 flex-col gap-x-4 gap-y-5 lg:flex-row">
        <PageSection className="min-h-[200px] flex-1" title="Json" control={jsonControl}>
          <Editor language="json" value={form.json} onChange={onJsonChange} />
        </PageSection>
        <PageSection className="min-h-[200px] flex-1" title="Yaml" control={yamlControl}>
          <Editor language="yaml" value={form.yaml} onChange={onYamlChange} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
