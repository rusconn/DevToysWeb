"use client";

import { toolGroups } from "../../_config/tools";
import { Textarea, type TextareaProps } from "../../_components/primitives/textarea";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { usePage } from "./use-page";

export default function ClientBoundary() {
  const { form, setFormByDecoded, setFormByEncoded, clearForm } = usePage();

  const changeFormByDecoded: TextareaProps["onChange"] = e => {
    setFormByDecoded(e.currentTarget.value);
  };
  const changeFormByEncoded: TextareaProps["onChange"] = e => {
    setFormByEncoded(e.currentTarget.value);
  };

  const clearButton = (
    <Button.Clear onClick={clearForm} iconOnly aria-label="clear decoded and encoded" />
  );

  const decodedControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFormByDecoded} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setFormByDecoded} iconOnly aria-label="load a decoded file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={form.decoded} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );
  const encodedControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFormByEncoded} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setFormByEncoded} iconOnly aria-label="load a encoded file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={form.encoded} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.html.longTitle}>
      <div className="flex flex-col gap-3">
        <PageSection title="Decoded" control={decodedControl}>
          <Textarea value={form.decoded} onChange={changeFormByDecoded} rows={10} />
        </PageSection>
        <PageSection title="Encoded" control={encodedControl}>
          <Textarea value={form.encoded} onChange={changeFormByEncoded} rows={10} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
