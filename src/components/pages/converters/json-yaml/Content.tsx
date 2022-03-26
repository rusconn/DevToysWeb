import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef, memo, useCallback, useState } from "react";
import YAML from "yaml";

import { CodeEditorHalfLoading, Main, MainItem } from "@/components/common";

import Configuration, { isSpaces, Spaces } from "./Configuration";

// https://github.com/securingsincity/react-ace/issues/27
const CodeEditorHalf = dynamic(
  async () => {
    const ace = await import("@/components/common/CodeEditorHalf");
    await Promise.all([
      import("ace-builds/src-noconflict/mode-json"),
      import("ace-builds/src-noconflict/mode-yaml"),
    ]);
    return ace;
  },
  { ssr: false, loading: () => <CodeEditorHalfLoading /> }
);

type CodeValue = NonNullable<ComponentPropsWithoutRef<typeof CodeEditorHalf>["value"]>;
type OnCodeChange = NonNullable<ComponentPropsWithoutRef<typeof CodeEditorHalf>["onChange"]>;

type Props = {
  json: CodeValue;
  yaml: CodeValue;
  onJsonChange: OnCodeChange;
  onYamlChange: OnCodeChange;
} & ComponentPropsWithoutRef<typeof Configuration>;

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
    <Stack direction="row" spacing={2}>
      <MainItem title="Json">
        <CodeEditorHalf
          name="json"
          mode="json"
          value={json}
          tabSize={spaces}
          onChange={onJsonChange}
        />
      </MainItem>
      <MainItem title="Yaml">
        <CodeEditorHalf
          name="yaml"
          mode="yaml"
          value={yaml}
          tabSize={spaces}
          onChange={onYamlChange}
        />
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
