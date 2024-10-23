"use client";

import { useState } from "react";

import { toolGroups } from "@/config/tools";
import { decode } from "@/lib/jwt";
import { Editor } from "@/components/ui/editor";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import * as Button from "@/components/buttons";
import { ControlMenu, ControlMenuItem } from "@/components/control-menu";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

export default function Page() {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  const { header: h, payload: p } = decode(jwt);
  const header = h.map(x => JSON.stringify(x, null, 2)).unwrapOr("");
  const payload = p.map(x => JSON.stringify(x, null, 2)).unwrapOr("");

  const clearJwt = () => setJwt("");

  const onJwtChange: TextareaProps["onChange"] = e => setJwt(e.currentTarget.value);

  const jwtTokenControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setJwt} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setJwt} iconOnly aria-label="load a token file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearJwt} iconOnly aria-label="clear token" />
      </ControlMenuItem>
    </ControlMenu>
  );

  const heaederControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={header} />
      </ControlMenuItem>
    </ControlMenu>
  );
  const payloadControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={payload} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.jwt.longTitle}>
      <PageSection title="Jwt Token" control={jwtTokenControl}>
        <Textarea value={jwt} onChange={onJwtChange} rows={3} />
      </PageSection>
      <div className="flex flex-col gap-3">
        <PageSection title="Header" control={heaederControl}>
          <Editor height={180} language="json" value={header} options={{ readOnly: true }} />
        </PageSection>
        <PageSection title="Payload" control={payloadControl}>
          <Editor height={180} language="json" value={payload} options={{ readOnly: true }} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
