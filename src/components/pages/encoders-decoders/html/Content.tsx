import { decode, encode } from "html-entities";
import { ComponentPropsWithoutRef, memo, useCallback, useState } from "react";

import { Main, MainItem, TextField } from "@/components/common";

type TextFieldValue = ComponentPropsWithoutRef<typeof TextField>["value"];
type OnTextFieldChange = NonNullable<ComponentPropsWithoutRef<typeof TextField>["onChange"]>;

type Props = {
  decoded: TextFieldValue;
  encoded: TextFieldValue;
  onDecodedChange: OnTextFieldChange;
  onEncodedChange: OnTextFieldChange;
};

const StyledComponent = ({ decoded, encoded, onDecodedChange, onEncodedChange }: Props) => (
  <Main title="HTML Encoder / Decoder">
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
  const [decoded, setDecoded] = useState("<Hello World>");
  const [encoded, setEncoded] = useState("&lt;Hello World&gt;");

  const onDecodedChange: Props["onDecodedChange"] = useCallback(({ currentTarget: { value } }) => {
    setDecoded(value);
    setEncoded(encode(value));
  }, []);

  const onEncodedChange: Props["onEncodedChange"] = useCallback(({ currentTarget: { value } }) => {
    setEncoded(value);
    setDecoded(decode(value));
  }, []);

  return <Component {...{ decoded, encoded, onDecodedChange, onEncodedChange }} />;
};

export default Container;
