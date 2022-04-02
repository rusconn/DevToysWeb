import { Stack } from "@mui/material";
import createHash from "create-hash"; // smaller bundle size than Node.js standard library
import { ComponentPropsWithoutRef, memo, useCallback, useState } from "react";

import { Main, MainItem, TextField } from "@/components/common";

import Configuration from "./Configuration";

type TextFieldValue = ComponentPropsWithoutRef<typeof TextField>["value"];
type OnTextFieldChange = NonNullable<ComponentPropsWithoutRef<typeof TextField>["onChange"]>;

type Props = {
  input: TextFieldValue;
  md5: TextFieldValue;
  sha1: TextFieldValue;
  sha256: TextFieldValue;
  sha512: TextFieldValue;
  onInputChange: OnTextFieldChange;
} & ComponentPropsWithoutRef<typeof Configuration>;

const StyledComponent = ({
  uppercase,
  input,
  md5,
  sha1,
  sha256,
  sha512,
  onCaseChange,
  onInputChange,
}: Props) => (
  <Main title="Hash Generator">
    <MainItem title="Configuration">
      <Configuration {...{ uppercase, onCaseChange }} />
    </MainItem>
    <MainItem title="Input">
      <TextField multiline rows={5} value={input} onChange={onInputChange} />
    </MainItem>
    <Stack spacing={1}>
      <MainItem title="MD5">
        <TextField value={md5} InputProps={{ readOnly: true }} />
      </MainItem>
      <MainItem title="SHA1">
        <TextField value={sha1} InputProps={{ readOnly: true }} />
      </MainItem>
      <MainItem title="SHA256">
        <TextField value={sha256} InputProps={{ readOnly: true }} />
      </MainItem>
      <MainItem title="SHA512">
        <TextField value={sha512} InputProps={{ readOnly: true }} />
      </MainItem>
    </Stack>
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [uppercase, setUppercase] = useState(false);
  const [input, setInput] = useState("Hello there !");

  const onCaseChange: Props["onCaseChange"] = useCallback((_e, checked) => {
    setUppercase(checked);
  }, []);

  const onInputChange: Props["onInputChange"] = useCallback(({ currentTarget: { value } }) => {
    setInput(value);
  }, []);

  const newMd5 = createHash("md5").update(input).digest("hex");
  const newSha1 = createHash("sha1").update(input).digest("hex");
  const newSha256 = createHash("sha256").update(input).digest("hex");
  const newSha512 = createHash("sha512").update(input).digest("hex");

  const md5 = uppercase ? newMd5.toUpperCase() : newMd5;
  const sha1 = uppercase ? newSha1.toUpperCase() : newSha1;
  const sha256 = uppercase ? newSha256.toUpperCase() : newSha256;
  const sha512 = uppercase ? newSha512.toUpperCase() : newSha512;

  return (
    <Component
      {...{
        uppercase,
        input,
        md5,
        sha1,
        sha256,
        sha512,
        onCaseChange,
        onInputChange,
      }}
    />
  );
};

export default Container;
