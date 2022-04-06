import { memo, useCallback, useState } from "react";

import { Main, MainItem, TextField, TextFieldProps } from "@/components/common";

type TextFieldValue = TextFieldProps["value"];
type OnTextFieldChange = NonNullable<TextFieldProps["onChange"]>;

type Props = {
  decoded: TextFieldValue;
  encoded: TextFieldValue;
  onDecodedChange: OnTextFieldChange;
  onEncodedChange: OnTextFieldChange;
};

const StyledComponent = ({ decoded, encoded, onDecodedChange, onEncodedChange }: Props) => (
  <Main title="URL Encoder / Decoder">
    <MainItem title="Decoded">
      <TextField multiline rows={10} value={decoded} onChange={onDecodedChange} />
    </MainItem>
    <MainItem title="Encoded">
      <TextField multiline rows={10} value={encoded} onChange={onEncodedChange} />
    </MainItem>
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [decoded, setDecoded] = useState("http://example.com?q=foo bar");
  const [encoded, setEncoded] = useState("http://example.com?q=foo%20bar");

  const onDecodedChange: Props["onDecodedChange"] = useCallback(({ currentTarget: { value } }) => {
    setDecoded(value);

    try {
      setEncoded(encodeURI(value));
    } catch {
      setEncoded("");
    }
  }, []);

  const onEncodedChange: Props["onEncodedChange"] = useCallback(({ currentTarget: { value } }) => {
    setEncoded(value);

    try {
      setDecoded(decodeURI(value));
    } catch {
      setDecoded("");
    }
  }, []);

  return <Component {...{ decoded, encoded, onDecodedChange, onEncodedChange }} />;
};

export default Container;
