import { encode, decode, isValid } from "js-base64";
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
  <Main title="Base 64 Encoder / Decoder">
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
  const [decoded, setDecoded] = useState("Hello there !");
  const [encoded, setEncoded] = useState("SGVsbG8gdGhlcmUgIQ==");

  const onDecodedChange: Props["onDecodedChange"] = useCallback(({ currentTarget: { value } }) => {
    setDecoded(value);
    setEncoded(encode(value));
  }, []);

  const onEncodedChange: Props["onEncodedChange"] = useCallback(({ currentTarget: { value } }) => {
    setEncoded(value);

    const newDecoded = decode(value);

    if (isValid(value) && !newDecoded.includes("�")) {
      setDecoded(newDecoded);
    } else {
      setDecoded("");
    }
  }, []);

  return <Component {...{ decoded, encoded, onDecodedChange, onEncodedChange }} />;
};

export default Container;
