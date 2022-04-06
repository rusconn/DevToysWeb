import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import { range } from "fp-ts/NonEmptyArray";
import { memo, useCallback, useState } from "react";

import { Main, MainItem, TextField, TextFieldProps } from "@/components/common";
import { uuid } from "@/libs/uuid";

import Configuration, {
  Props as ConfigurationProps,
  isUuidVersion,
  UuidVersion,
} from "./Configuration";

type TextFieldValue = TextFieldProps["value"];
type OnTextFieldChange = NonNullable<TextFieldProps["onChange"]>;
type OnButtonClick = NonNullable<ButtonProps["onChange"]>;

type Props = {
  generates: TextFieldValue;
  uuids: TextFieldValue;
  onGeneratesChange: OnTextFieldChange;
  onGenerateClick: OnButtonClick;
} & ConfigurationProps;

const StyledComponent = ({
  hyphens,
  uppercase,
  uuidVersion,
  generates,
  uuids,
  onHyphensChange,
  onCaseChange,
  onUuidVersionChange,
  onGeneratesChange,
  onGenerateClick,
}: Props) => (
  <Main title="UUID Generator">
    <MainItem title="Configuration">
      <Configuration
        {...{ hyphens, uppercase, uuidVersion, onHyphensChange, onCaseChange, onUuidVersionChange }}
      />
    </MainItem>
    <MainItem title="Generate">
      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="contained" onClick={onGenerateClick}>
          Generate UUID(s)
        </Button>
        <Typography fontSize={theme => theme.typography.fontSize * 2.2}>×</Typography>
        <TextField type="number" fullWidth={false} value={generates} onChange={onGeneratesChange} />
      </Stack>
    </MainItem>
    <MainItem title="UUID(s)">
      <TextField multiline rows={10} value={uuids} InputProps={{ readOnly: true }} />
    </MainItem>
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>(4);
  const [generates, setGenerates] = useState(1);
  const [uuidArray, setUuidArray] = useState<string[]>([]);

  const onHyphensChange: Props["onHyphensChange"] = useCallback((_e, checked) => {
    setHyphens(checked);
  }, []);

  const onCaseChange: Props["onCaseChange"] = useCallback((_e, checked) => {
    setUppercase(checked);
  }, []);

  const onUuidVersionChange: Props["onUuidVersionChange"] = useCallback(({ target: { value } }) => {
    const newUuidVersion = Number(value);

    if (isUuidVersion(newUuidVersion)) {
      setUuidVersion(newUuidVersion);
    }
  }, []);

  const onGeneratesChange: Props["onGeneratesChange"] = useCallback(
    ({ currentTarget: { value } }) => {
      const newGenerates = Number(value);

      if (newGenerates >= 1 && newGenerates <= 1000) {
        setGenerates(newGenerates);
      }
    },
    []
  );

  const onGenerateClick: Props["onGenerateClick"] = useCallback(() => {
    const newUuids = range(1, generates).map(_ => uuid(uuidVersion, hyphens, uppercase));
    setUuidArray([...uuidArray, ...newUuids]);
  }, [hyphens, uppercase, uuidVersion, generates, uuidArray]);

  const uuids = uuidArray.join("\n");

  return (
    <Component
      {...{
        hyphens,
        uppercase,
        uuidVersion,
        generates,
        uuids,
        onHyphensChange,
        onCaseChange,
        onUuidVersionChange,
        onGeneratesChange,
        onGenerateClick,
      }}
    />
  );
};

export default Container;
