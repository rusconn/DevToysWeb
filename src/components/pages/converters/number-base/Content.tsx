import { Stack } from "@mui/material";
import { memo, useCallback, useState } from "react";

import { Main, MainItem, TextField, TextFieldProps } from "@/components/common";
import {
  formatBinary,
  formatDecimal,
  formatHexadecimal,
  formatOctal,
  isBinary,
  isDecimal,
  isHexadecimal,
  isOctal,
  unformatBinary,
  unformatDecimal,
  unformatHexadecimal,
  unformatOctal,
} from "@/libs/string";

import Configuration, { Props as ConfigurationProps } from "./Configuration";

type TextFieldValue = TextFieldProps["value"];
type OnTextFieldChange = NonNullable<TextFieldProps["onChange"]>;

type Props = {
  dec: TextFieldValue;
  hex: TextFieldValue;
  oct: TextFieldValue;
  bin: TextFieldValue;
  onDecChange: OnTextFieldChange;
  onHexChange: OnTextFieldChange;
  onOctChange: OnTextFieldChange;
  onBinChange: OnTextFieldChange;
} & ConfigurationProps;

const StyledComponent = ({
  format,
  dec,
  hex,
  oct,
  bin,
  onFormatChange,
  onDecChange,
  onHexChange,
  onOctChange,
  onBinChange,
}: Props) => (
  <Main title="Number Base Converter">
    <MainItem title="Configuration">
      <Configuration {...{ format, onFormatChange }} />
    </MainItem>
    <Stack spacing={1}>
      <MainItem title="Decimal">
        <TextField value={dec} onChange={onDecChange} />
      </MainItem>
      <MainItem title="Hexadecimal">
        <TextField value={hex} onChange={onHexChange} />
      </MainItem>
      <MainItem title="Octal">
        <TextField value={oct} onChange={onOctChange} />
      </MainItem>
      <MainItem title="Binary">
        <TextField value={bin} onChange={onBinChange} />
      </MainItem>
    </Stack>
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [format, setFormat] = useState(false);
  const [int, setInt] = useState<bigint | undefined>(BigInt(42));

  const onFormatChange: Props["onFormatChange"] = useCallback((_e, checked) => {
    setFormat(checked);
  }, []);

  const trySetInt = (
    value: string,
    prefix: string,
    validate: (x: string) => boolean,
    unformat: (x: string) => string
  ) => {
    if (value === "") {
      setInt(undefined);
      return;
    }

    const unformatted = unformat(value);

    if (!validate(unformatted)) {
      return;
    }

    const newInt = BigInt(`${prefix}${unformatted}`);

    setInt(newInt);
  };

  const onDecChange: Props["onDecChange"] = useCallback(({ currentTarget: { value } }) => {
    trySetInt(value, "", isDecimal, unformatDecimal);
  }, []);

  const onHexChange: Props["onHexChange"] = useCallback(({ currentTarget: { value } }) => {
    trySetInt(value, "0x", isHexadecimal, unformatHexadecimal);
  }, []);

  const onOctChange: Props["onOctChange"] = useCallback(({ currentTarget: { value } }) => {
    trySetInt(value, "0o", isOctal, unformatOctal);
  }, []);

  const onBinChange: Props["onBinChange"] = useCallback(({ currentTarget: { value } }) => {
    trySetInt(value, "0b", isBinary, unformatBinary);
  }, []);

  const newDec = int?.toString(10) ?? "";
  const newHex = int?.toString(16).toUpperCase() ?? "";
  const newOct = int?.toString(8) ?? "";
  const newBin = int?.toString(2) ?? "";

  const dec = format ? formatDecimal(newDec) : newDec;
  const hex = format ? formatHexadecimal(newHex) : newHex;
  const oct = format ? formatOctal(newOct) : newOct;
  const bin = format ? formatBinary(newBin) : newBin;

  return (
    <Component
      {...{
        format,
        dec,
        hex,
        oct,
        bin,
        onFormatChange,
        onDecChange,
        onHexChange,
        onOctChange,
        onBinChange,
      }}
    />
  );
};

export default Container;
