"use client";

import { useCallback, useMemo, useState } from "react";

import { toolGroups } from "@/config/tools";
import { decode } from "@/lib/jwt";
import { Editor } from "@/components/ui/editor";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { ClearButton } from "@/components/buttons/clear";
import { CopyButton } from "@/components/buttons/copy";
import { FileButton } from "@/components/buttons/file";
import { PasteButton } from "@/components/buttons/paste";
import { ControlMenu } from "@/components/control-menu";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

export default function Page() {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  const { header: h, payload: p } = decode(jwt);
  const header = h.isErr() ? "" : JSON.stringify(h.value, null, 2);
  const payload = p.isErr() ? "" : JSON.stringify(p.value, null, 2);

  const clearJwt = useCallback(() => setJwt(""), []);

  const onJwtChange: TextareaProps["onChange"] = ({ currentTarget: { value } }) => setJwt(value);

  const jwtTokenPasteButton = useMemo(() => <PasteButton onClipboardRead={setJwt} />, [setJwt]);

  const jwtTokenFileButton = useMemo(
    () => <FileButton onFileRead={setJwt} iconOnly aria-label="load a token file" />,
    [setJwt]
  );

  const jwtTokenClearButton = useMemo(
    () => <ClearButton onClick={clearJwt} iconOnly aria-label="clear token" />,
    [clearJwt]
  );

  const heaederCopyButton = useMemo(() => <CopyButton text={header} />, [header]);
  const payloadCopyButton = useMemo(() => <CopyButton text={payload} />, [payload]);

  const jwtTokenControl = (
    <ControlMenu list={[jwtTokenPasteButton, jwtTokenFileButton, jwtTokenClearButton]} />
  );

  const heaederControl = <ControlMenu list={[heaederCopyButton]} />;
  const payloadControl = <ControlMenu list={[payloadCopyButton]} />;

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.jwt.longTitle}>
      <PageSection title="Jwt Token" control={jwtTokenControl}>
        <Textarea value={jwt} onChange={onJwtChange} rows={3} />
      </PageSection>
      <PageSection title="Header" control={heaederControl}>
        <Editor height={180} language="json" value={header} options={{ readOnly: true }} />
      </PageSection>
      <PageSection title="Payload" control={payloadControl}>
        <Editor height={180} language="json" value={payload} options={{ readOnly: true }} />
      </PageSection>
    </PageRootSection>
  );
}
