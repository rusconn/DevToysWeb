"use client";

import { useCallback, useState } from "react";

import { toolGroups } from "@/config/tools";
import { safeDecodeURIComponent, safeEncodeURIComponent } from "@/lib/uri";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import * as Button from "@/components/buttons";
import { ControlMenu, ControlMenuItem } from "@/components/control-menu";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

export default function Page() {
  const [form, setForm] = useState({
    decoded: '> It\'s "URL encoding"?',
    encoded: "%3E%20It's%20%22URL%20encoding%22%3F",
  });

  const setFormByDecoded = useCallback((text: string) => {
    setForm({
      decoded: text,
      encoded: safeEncodeURIComponent(text).unwrapOr(""),
    });
  }, []);

  const setFormByEncoded = useCallback((text: string) => {
    setForm({
      decoded: safeDecodeURIComponent(text).unwrapOr(""),
      encoded: text,
    });
  }, []);

  const clearBoth = useCallback(() => {
    setForm({
      decoded: "",
      encoded: "",
    });
  }, []);

  const onDecodedChange: TextareaProps["onChange"] = e => setFormByDecoded(e.currentTarget.value);
  const onEncodedChange: TextareaProps["onChange"] = e => setFormByEncoded(e.currentTarget.value);

  const clearButton = (
    <Button.Clear onClick={clearBoth} iconOnly aria-label="clear decoded and encoded" />
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
    <PageRootSection title={toolGroups.encodersDecoders.tools.url.longTitle}>
      <div className="flex flex-col gap-3">
        <PageSection title="Decoded" control={decodedControl}>
          <Textarea value={form.decoded} onChange={onDecodedChange} rows={10} />
        </PageSection>
        <PageSection title="Encoded" control={encodedControl}>
          <Textarea value={form.encoded} onChange={onEncodedChange} rows={10} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
