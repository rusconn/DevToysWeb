"use client";

import { useCallback, useState } from "react";

import { toolGroups } from "@/config/tools";
import { decode, encode } from "@/lib/base64";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import * as Button from "@/components/buttons";
import { ControlMenu } from "@/components/control-menu";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

export default function Page() {
  const [form, setForm] = useState({
    decoded: "😀😂🤣",
    encoded: "8J+YgPCfmILwn6Sj",
  });

  const setFormByDecoded = useCallback((text: string) => {
    setForm({
      decoded: text,
      encoded: encode(text),
    });
  }, []);

  const setFormByEncoded = useCallback((text: string) => {
    const newDecoded = decode(text) ?? "";

    setForm({
      decoded: newDecoded.includes("�") ? "" : newDecoded,
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

  const decodedPasteButton = <Button.Paste onClipboardRead={setFormByDecoded} />;
  const encodedPasteButton = <Button.Paste onClipboardRead={setFormByEncoded} />;

  const decodedFileButton = (
    <Button.File onFileRead={setFormByDecoded} iconOnly aria-label="load a decoded file" />
  );
  const encodedFileButton = (
    <Button.File onFileRead={setFormByEncoded} iconOnly aria-label="load a encoded file" />
  );

  const decodedCopyButton = <Button.Copy text={form.decoded} />;
  const encodedCopyButton = <Button.Copy text={form.encoded} />;

  const clearButton = (
    <Button.Clear onClick={clearBoth} iconOnly aria-label="clear decoded and encoded" />
  );

  const decodedControl = (
    <ControlMenu list={[decodedPasteButton, decodedFileButton, decodedCopyButton, clearButton]} />
  );
  const encodedControl = (
    <ControlMenu list={[encodedPasteButton, encodedFileButton, encodedCopyButton, clearButton]} />
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.base64.longTitle}>
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
