"use client";

import { useCallback, useMemo, useState } from "react";
import * as O from "fp-ts/lib/Option";
import YAML from "yaml";

import { toolGroups } from "@/config/tools";
import { safeJsonParse } from "@/lib/json";
import { safeYamlParse } from "@/lib/yaml";
import { Editor, EditorProps } from "@/components/ui/editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectProps,
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

  const setJsonReactively = useCallback((text: string) => {
    const parsed = safeJsonParse(text);

    setForm(prev => ({
      ...prev,
      json: text,
      yaml: O.isNone(parsed)
        ? ""
        : YAML.stringify(parsed.value, { indent: prev.indentation.length, simpleKeys: true }),
    }));
  }, []);

  const setYamlReactively = useCallback((text: string) => {
    const parsed = safeYamlParse(text, (_, v) => v, { merge: true });

    setForm(prev => ({
      ...prev,
      yaml: text,
      json: O.isNone(parsed) ? "" : JSON.stringify(parsed.value, null, prev.indentation),
    }));
  }, []);

  const clearBoth = useCallback(() => {
    setForm(prev => ({ ...prev, json: "", yaml: "" }));
  }, []);

  const onIndentationChange: SelectProps["onValueChange"] = value => {
    const parsed = safeJsonParse(form.json);

    const jsonYaml = O.isNone(parsed)
      ? { json: "", yaml: "" }
      : {
          json: JSON.stringify(parsed.value, null, value),
          yaml: YAML.stringify(parsed.value, { indent: value.length, simpleKeys: true }),
        };

    setForm({
      indentation: value,
      ...jsonYaml,
    });
  };

  const onJsonChange: EditorProps["onChange"] = value => setJsonReactively(value ?? "");
  const onYamlChange: EditorProps["onChange"] = value => setYamlReactively(value ?? "");

  const indentationIcon = useMemo(() => <icons.Space size={24} className="-translate-y-1.5" />, []);

  const indentationConfig = (
    <Configuration
      icon={indentationIcon}
      title="Indentation"
      control={
        <Select value={form.indentation} onValueChange={onIndentationChange}>
          <SelectTrigger
            className="w-28"
            aria-label="toggle open/close state of indentation selection"
          >
            <SelectValue placeholder={form.indentation} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={indentations.two}>2 spaces</SelectItem>
            <SelectItem value={indentations.four}>4 spaces</SelectItem>
          </SelectContent>
        </Select>
      }
    />
  );

  const jsonPasteButton = useMemo(
    () => <PasteButton onClipboardRead={setJsonReactively} />,
    [setJsonReactively]
  );

  const yamlPasteButton = useMemo(
    () => <PasteButton onClipboardRead={setYamlReactively} />,
    [setYamlReactively]
  );

  const jsonFileButton = useMemo(
    () => (
      <FileButton
        accept=".json"
        onFileRead={setJsonReactively}
        iconOnly
        aria-label="load a json file"
      />
    ),
    [setJsonReactively]
  );

  const yamlFileButton = useMemo(
    () => (
      <FileButton
        accept=".yml,.yaml"
        onFileRead={setYamlReactively}
        iconOnly
        aria-label="load a yaml file"
      />
    ),
    [setYamlReactively]
  );

  const jsonCopyButton = <CopyButton text={form.json} />;
  const yamlCopyButton = <CopyButton text={form.yaml} />;

  const clearButton = useMemo(
    () => <ClearButton onClick={clearBoth} iconOnly aria-label="clear json and yaml" />,
    [clearBoth]
  );

  const jsonControl = (
    <ControlMenu list={[jsonPasteButton, jsonFileButton, jsonCopyButton, clearButton]} />
  );

  const yamlControl = (
    <ControlMenu list={[yamlPasteButton, yamlFileButton, yamlCopyButton, clearButton]} />
  );

  return (
    <PageRootSection
      className="flex h-full flex-col"
      title={toolGroups.converters.tools.jsonYaml.longTitle}
    >
      <PageSection className="mb-6 mt-0" title="Configuration">
        <Configurations list={[indentationConfig]} />
      </PageSection>
      <div className="flex flex-1 flex-col gap-x-4 gap-y-5 lg:flex-row">
        <PageSection className="mt-0 min-h-[200px] flex-1" title="Json" control={jsonControl}>
          <Editor language="json" value={form.json} onChange={onJsonChange} />
        </PageSection>
        <PageSection className="mt-0 min-h-[200px] flex-1" title="Yaml" control={yamlControl}>
          <Editor language="yaml" value={form.yaml} onChange={onYamlChange} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
