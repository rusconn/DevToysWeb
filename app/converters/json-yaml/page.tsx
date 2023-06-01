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

const two = "  ";
const four = "    ";

export default function Page() {
  const [indentation, setIndentation] = useState(two);
  const [json, setJson] = useState('{\n  "foo": "bar"\n}');
  const [yaml, setYaml] = useState("foo: bar");

  const setJsonReactively = useCallback(
    (text: string) => {
      const parsed = safeJsonParse(text);

      setJson(text);
      setYaml(
        O.isNone(parsed)
          ? ""
          : YAML.stringify(parsed.value, { indent: indentation.length, simpleKeys: true })
      );
    },
    [indentation.length]
  );

  const setYamlReactively = useCallback(
    (text: string) => {
      const parsed = safeYamlParse(text, (_, v) => v, { merge: true });

      setYaml(text);
      setJson(O.isNone(parsed) ? "" : JSON.stringify(parsed.value, null, indentation));
    },
    [indentation]
  );

  const clearBoth = useCallback(() => {
    setJson("");
    setYaml("");
  }, []);

  const onIndentationChange: SelectProps["onValueChange"] = value => {
    setIndentation(value);

    const parsed = safeJsonParse(json);

    if (O.isNone(parsed)) {
      clearBoth();
    } else {
      setJson(JSON.stringify(parsed.value, null, value));
      setYaml(YAML.stringify(parsed.value, { indent: value.length, simpleKeys: true }));
    }
  };

  const onJsonChange: EditorProps["onChange"] = value => setJsonReactively(value ?? "");
  const onYamlChange: EditorProps["onChange"] = value => setYamlReactively(value ?? "");

  const indentationIcon = useMemo(() => <icons.Space size={24} className="-translate-y-1.5" />, []);

  const indentationConfig = (
    <Configuration
      icon={indentationIcon}
      title="Indentation"
      control={
        <Select value={indentation} onValueChange={onIndentationChange}>
          <SelectTrigger
            className="w-28"
            aria-label="toggle open/close state of indentation selection"
          >
            <SelectValue placeholder={indentation} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={two}>2 spaces</SelectItem>
            <SelectItem value={four}>4 spaces</SelectItem>
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

  const jsonCopyButton = <CopyButton text={json} />;
  const yamlCopyButton = <CopyButton text={yaml} />;

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
          <Editor language="json" value={json} onChange={onJsonChange} />
        </PageSection>
        <PageSection className="mt-0 min-h-[200px] flex-1" title="Yaml" control={yamlControl}>
          <Editor language="yaml" value={yaml} onChange={onYamlChange} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
