"use client";

import { useState } from "react";
import yaml from "js-yaml";

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

import { safeYamlParse } from "./lib";

import styles from "./page.client.module.css";

const indentations = {
  two: "  ",
  four: "    ",
};

export default function ClientBoundary() {
  const [form, setForm] = useState({
    indentation: indentations.two,
    json: '{\n  "foo": "bar"\n}',
    yaml: "foo: bar",
  });

  const setFormByJson = (text: string) => {
    setForm(prev => ({
      ...prev,
      json: text,
      yaml: safeJsonParse(text)
        .map(x => yaml.dump(x, { indent: prev.indentation.length, quotingType: '"' }))
        .unwrapOr(""),
    }));
  };

  const setFormByYaml = (text: string) => {
    setForm(prev => ({
      ...prev,
      json: safeYamlParse(text)
        .map(x => JSON.stringify(x, null, prev.indentation))
        .unwrapOr(""),
      yaml: text,
    }));
  };

  const clearBoth = () => {
    setForm(prev => ({
      ...prev,
      json: "",
      yaml: "",
    }));
  };

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
    <ConfigurationItem
      icon={<icons.Space size={24} style={{ transform: "translateY(-0.375rem)" }} />}
      title="Indentation"
      control={
        <Select.Root value={form.indentation} onValueChange={onIndentationChange}>
          <Select.Trigger aria-label="toggle open/close state of indentation selection">
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

  const clearButton = (
    <Button.Clear onClick={clearBoth} iconOnly aria-label="clear json and yaml" />
  );

  const jsonControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFormByJson} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File
          accept=".json"
          onFileRead={setFormByJson}
          iconOnly
          aria-label="load a json file"
        />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={form.json} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );
  const yamlControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFormByYaml} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File
          accept=".yml,.yaml"
          onFileRead={setFormByYaml}
          iconOnly
          aria-label="load a yaml file"
        />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={form.yaml} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection size="fullHeight" title={toolGroups.converters.tools.jsonYaml.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{indentationConfig}</Configuration>
      </PageSection>
      <div className={styles["editor-container"]}>
        <PageSection size="fullHeight" title="Json" control={jsonControl}>
          <Editor language="json" value={form.json} onChange={onJsonChange} />
        </PageSection>
        <PageSection size="fullHeight" title="Yaml" control={yamlControl}>
          <Editor language="yaml" value={form.yaml} onChange={onYamlChange} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
