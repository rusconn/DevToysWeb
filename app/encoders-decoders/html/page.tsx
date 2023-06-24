"use client";

import { useCallback, useState } from "react";
import { escape, unescape } from "html-escaper";

import { toolGroups } from "@/config/tools";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { ClearButton } from "@/components/buttons/clear";
import { CopyButton } from "@/components/buttons/copy";
import { FileButton } from "@/components/buttons/file";
import { PasteButton } from "@/components/buttons/paste";
import { ControlMenu } from "@/components/control-menu";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

export default function Page() {
  const [form, setForm] = useState({
    decoded: '> It\'s "HTML escaping".',
    encoded: "&gt; It&#39;s &quot;HTML escaping&quot;.",
  });

  const setDecodedReactively = useCallback((text: string) => {
    setForm({
      decoded: text,
      encoded: escape(text),
    });
  }, []);

  const setEncodedReactively = useCallback((text: string) => {
    setForm({
      encoded: text,
      decoded: unescape(text),
    });
  }, []);

  const clearBoth = useCallback(() => {
    setForm({
      decoded: "",
      encoded: "",
    });
  }, []);

  const onDecodedChange: TextareaProps["onChange"] = ({ currentTarget: { value } }) =>
    setDecodedReactively(value);

  const onEncodedChange: TextareaProps["onChange"] = ({ currentTarget: { value } }) =>
    setEncodedReactively(value);

  const decodedPasteButton = <PasteButton onClipboardRead={setDecodedReactively} />;
  const encodedPasteButton = <PasteButton onClipboardRead={setEncodedReactively} />;

  const decodedFileButton = (
    <FileButton onFileRead={setDecodedReactively} iconOnly aria-label="load a decoded file" />
  );
  const encodedFileButton = (
    <FileButton onFileRead={setEncodedReactively} iconOnly aria-label="load a encoded file" />
  );

  const decodedCopyButton = <CopyButton text={form.decoded} />;
  const encodedCopyButton = <CopyButton text={form.encoded} />;

  const clearButton = (
    <ClearButton onClick={clearBoth} iconOnly aria-label="clear decoded and encoded" />
  );

  const decodedControl = (
    <ControlMenu list={[decodedPasteButton, decodedFileButton, decodedCopyButton, clearButton]} />
  );

  const encodedControl = (
    <ControlMenu list={[encodedPasteButton, encodedFileButton, encodedCopyButton, clearButton]} />
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.html.longTitle}>
      <PageSection title="Decoded" control={decodedControl}>
        <Textarea value={form.decoded} onChange={onDecodedChange} rows={10} />
      </PageSection>
      <PageSection title="Encoded" control={encodedControl}>
        <Textarea value={form.encoded} onChange={onEncodedChange} rows={10} />
      </PageSection>
    </PageRootSection>
  );
}
