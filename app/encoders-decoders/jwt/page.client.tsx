"use client";

import { toolGroups } from "../../_config/tools";
import { Textarea, type TextareaProps } from "../../_components/primitives/textarea";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { Editor } from "../../_components/editor";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { usePage } from "./use-page";

export default function ClientBoundary() {
  const { jwt, setJwt, clearJwt, header, payload } = usePage();

  const changeJwt: TextareaProps["onChange"] = e => {
    setJwt(e.currentTarget.value);
  };

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
        <Textarea value={jwt} onChange={changeJwt} rows={3} />
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
