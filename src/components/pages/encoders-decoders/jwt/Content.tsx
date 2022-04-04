import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef, memo, useCallback, useState } from "react";

import { Main, MainItem, TextField } from "@/components/common";
import { decode } from "@/libs/jwt";

// https://github.com/securingsincity/react-ace/issues/27
const CodeEditor = dynamic(
  async () => {
    const ace = await import("@/components/common/CodeEditor");
    await import("ace-builds/src-noconflict/mode-json");
    return ace;
  },
  { ssr: false, loading: () => <Skeleton variant="rectangular" width="100%" height="160px" /> }
);

type TextFieldValue = ComponentPropsWithoutRef<typeof TextField>["value"];
type CodeValue = NonNullable<ComponentPropsWithoutRef<typeof CodeEditor>["value"]>;
type OnTextFieldChange = NonNullable<ComponentPropsWithoutRef<typeof TextField>["onChange"]>;

type Props = {
  jwt: TextFieldValue;
  header: CodeValue;
  payload: CodeValue;
  onJwtChange: OnTextFieldChange;
};

const StyledComponent = ({ jwt, header, payload, onJwtChange }: Props) => (
  <Main title="JWT Decoder">
    <MainItem title="Jwt Token">
      <TextField multiline rows={5} value={jwt} onChange={onJwtChange} />
    </MainItem>
    <MainItem title="Header">
      <CodeEditor readOnly height="160px" width="100%" name="header" mode="json" value={header} />
    </MainItem>
    <MainItem title="Payload">
      <CodeEditor readOnly height="160px" width="100%" name="payload" mode="json" value={payload} />
    </MainItem>
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  const onJwtChange: Props["onJwtChange"] = useCallback(({ currentTarget: { value } }) => {
    setJwt(value);
  }, []);

  const { headerObj, payloadObj } = decode(jwt);
  const header = JSON.stringify(headerObj, null, 2) ?? "";
  const payload = JSON.stringify(payloadObj, null, 2) ?? "";

  return <Component {...{ jwt, header, payload, onJwtChange }} />;
};

export default Container;
