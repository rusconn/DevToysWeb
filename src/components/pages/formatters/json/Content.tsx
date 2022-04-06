import { Skeleton, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { memo, useCallback, useState } from "react";

import { CodeEditorProps, Main, MainItem } from "@/components/common";

import Configuration, { Props as ConfigurationProps, isSpaces, Spaces } from "./Configuration";

// https://github.com/securingsincity/react-ace/issues/27
const CodeEditor = dynamic(
  async () => {
    const ace = await import("@/components/common/CodeEditor");
    await import("ace-builds/src-noconflict/mode-json");
    return ace;
  },
  { ssr: false, loading: () => <Skeleton variant="rectangular" height="100%" /> }
);

type CodeValue = NonNullable<CodeEditorProps["value"]>;
type OnCodeChange = NonNullable<CodeEditorProps["onChange"]>;

type Props = {
  json: CodeValue;
  formatted: CodeValue;
  onJsonChange: OnCodeChange;
} & ConfigurationProps;

const StyledComponent = ({ json, formatted, spaces, onJsonChange, onSpacesChange }: Props) => (
  <Main title="Json Formatter">
    <MainItem title="Configuration">
      <Configuration {...{ spaces, onSpacesChange }} />
    </MainItem>
    <Stack direction="row" spacing={2} height="100%">
      <MainItem title="Input" height="100%" flexGrow={1}>
        <CodeEditor name="json" mode="json" value={json} tabSize={2} onChange={onJsonChange} />
      </MainItem>
      <MainItem title="Output" height="100%" flexGrow={1}>
        <CodeEditor name="formatted" mode="json" value={formatted} tabSize={spaces} readOnly />
      </MainItem>
    </Stack>
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [json, setJson] = useState('{"foo":"bar"}');
  const [formatted, setFormatted] = useState('{\n  "foo": "bar"\n}');
  const [spaces, setSpaces] = useState<Spaces>(2);

  const onJsonChange: Props["onJsonChange"] = useCallback(
    value => {
      setJson(value);

      try {
        const parsed = JSON.parse(value) as unknown;
        setFormatted(JSON.stringify(parsed, null, spaces));
      } catch {
        setFormatted("");
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
        setFormatted(JSON.stringify(parsed, null, newSpaces));
      } catch {
        setFormatted("");
      }
    },
    [json]
  );

  return <Component {...{ json, formatted, spaces, onJsonChange, onSpacesChange }} />;
};

export default Container;
