import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef, memo, useCallback, useState } from "react";

import { CodeEditorHalfLoading, Main, MainItem } from "@/components/common";

import Configuration, { isSpaces, Spaces } from "./Configuration";

// https://github.com/securingsincity/react-ace/issues/27
const CodeEditorHalf = dynamic(
  async () => {
    const ace = await import("@/components/common/CodeEditorHalf");
    await import("ace-builds/src-noconflict/mode-json");
    return ace;
  },
  { ssr: false, loading: () => <CodeEditorHalfLoading /> }
);

type CodeValue = NonNullable<ComponentPropsWithoutRef<typeof CodeEditorHalf>["value"]>;
type OnCodeChange = NonNullable<ComponentPropsWithoutRef<typeof CodeEditorHalf>["onChange"]>;

type Props = {
  json: CodeValue;
  formatted: CodeValue;
  onJsonChange: OnCodeChange;
} & ComponentPropsWithoutRef<typeof Configuration>;

const StyledComponent = ({ json, formatted, spaces, onJsonChange, onSpacesChange }: Props) => (
  <Main title="Json Formatter">
    <MainItem title="Configuration">
      <Configuration {...{ spaces, onSpacesChange }} />
    </MainItem>
    <Stack direction="row" spacing={2}>
      <MainItem title="Input">
        <CodeEditorHalf name="json" mode="json" value={json} tabSize={2} onChange={onJsonChange} />
      </MainItem>
      <MainItem title="Output">
        <CodeEditorHalf name="formatted" mode="json" value={formatted} tabSize={spaces} readOnly />
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
