import { Skeleton, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { memo, useCallback, useState } from "react";
import YAML from "yaml";

import { Main, MainItem } from "@/components/common";
import { Props as CodeEditorProps } from "@/components/common/CodeEditor";

import Configuration, { Props as ConfigurationProps, isSpaces, Spaces } from "./Configuration";

// https://github.com/securingsincity/react-ace/issues/27
const CodeEditor = dynamic(
  async () => {
    const ace = await import("@/components/common/CodeEditor");
    await Promise.all([
      import("ace-builds/src-noconflict/mode-json"),
      import("ace-builds/src-noconflict/mode-yaml"),
    ]);
    return ace;
  },
  { ssr: false, loading: () => <Skeleton variant="rectangular" height="100%" /> }
);

type CodeValue = NonNullable<CodeEditorProps["value"]>;
type OnCodeChange = NonNullable<CodeEditorProps["onChange"]>;

type Props = {
  json: CodeValue;
  yaml: CodeValue;
  onJsonChange: OnCodeChange;
  onYamlChange: OnCodeChange;
} & ConfigurationProps;

const StyledComponent = ({
  json,
  yaml,
  spaces,
  onJsonChange,
  onYamlChange,
  onSpacesChange,
}: Props) => (
  <Main title="Json <> Yaml Converter">
    <MainItem title="Configuration">
      <Configuration {...{ spaces, onSpacesChange }} />
    </MainItem>
    <Stack direction="row" spacing={2} height="100%">
      <MainItem title="Json" height="100%" flexGrow={1}>
        <CodeEditor name="json" mode="json" value={json} tabSize={spaces} onChange={onJsonChange} />
      </MainItem>
      <MainItem title="Yaml" height="100%" flexGrow={1}>
        <CodeEditor name="yaml" mode="yaml" value={yaml} tabSize={spaces} onChange={onYamlChange} />
      </MainItem>
    </Stack>
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [json, setJson] = useState('{\n  "foo": "bar"\n}');
  const [yaml, setYaml] = useState("foo: bar");
  const [spaces, setSpaces] = useState<Spaces>(2);

  const onJsonChange: Props["onJsonChange"] = useCallback(
    value => {
      setJson(value);

      try {
        const parsed = JSON.parse(value) as unknown;
        setYaml(YAML.stringify(parsed, { indent: spaces, simpleKeys: true }));
      } catch {
        setYaml("");
      }
    },
    [spaces]
  );

  const onYamlChange: Props["onYamlChange"] = useCallback(
    value => {
      setYaml(value);

      try {
        const parsed = YAML.parse(value, { merge: true }) as unknown;
        setJson(JSON.stringify(parsed, null, spaces));
      } catch {
        setJson("");
      }
    },
    [spaces]
  );

  const onSpacesChange: Props["onSpacesChange"] = useCallback(
    ({ target: { value } }) => {
      const newSpaces = Number(value);

      if (!isSpaces(newSpaces)) {
        return;
      }

      setSpaces(newSpaces);

      try {
        const parsed = JSON.parse(json) as unknown;
        setJson(JSON.stringify(parsed, null, newSpaces));
        setYaml(YAML.stringify(parsed, { indent: newSpaces, simpleKeys: true }));
      } catch {
        setJson("");
        setYaml("");
      }
    },
    [json]
  );

  return <Component {...{ json, yaml, spaces, onJsonChange, onYamlChange, onSpacesChange }} />;
};

export default Container;
