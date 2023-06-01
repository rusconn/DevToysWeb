"use client";

import { useCallback, useMemo, useState } from "react";
import { decode, encode } from "html-entities";

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
    encoded: "&gt; It&apos;s &quot;HTML escaping&quot;.",
  });

  const setDecodedReactively = useCallback((text: string) => {
    setForm({
      decoded: text,
      encoded: encode(text),
    });
  }, []);

  const setEncodedReactively = useCallback((text: string) => {
    setForm({
      encoded: text,
      decoded: decode(text),
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

  const decodedPasteButton = useMemo(
    () => <PasteButton onClipboardRead={setDecodedReactively} />,
    [setDecodedReactively]
  );

  const encodedPasteButton = useMemo(
    () => <PasteButton onClipboardRead={setEncodedReactively} />,
    [setEncodedReactively]
  );

  const decodedFileButton = useMemo(
    () => (
      <FileButton onFileRead={setDecodedReactively} iconOnly aria-label="load a decoded file" />
    ),
    [setDecodedReactively]
  );

  const encodedFileButton = useMemo(
    () => (
      <FileButton onFileRead={setEncodedReactively} iconOnly aria-label="load a encoded file" />
    ),
    [setEncodedReactively]
  );

  const decodedCopyButton = useMemo(() => <CopyButton text={form.decoded} />, [form.decoded]);
  const encodedCopyButton = useMemo(() => <CopyButton text={form.encoded} />, [form.encoded]);

  const clearButton = useMemo(
    () => <ClearButton onClick={clearBoth} iconOnly aria-label="clear decoded and encoded" />,
    [clearBoth]
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
