"use client";

import { useCallback, useMemo, useState } from "react";

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
  const [decoded, setDecoded] = useState('> It\'s "URL encoding"?');
  const [encoded, setEncoded] = useState("%3E%20It's%20%22URL%20encoding%22%3F");

  const setDecodedReactively = useCallback((text: string) => {
    setDecoded(text);

    try {
      setEncoded(encodeURIComponent(text));
    } catch {
      setEncoded("");
    }
  }, []);

  const setEncodedReactively = useCallback((text: string) => {
    setEncoded(text);

    try {
      setDecoded(decodeURIComponent(text));
    } catch {
      setDecoded("");
    }
  }, []);

  const clearBoth = useCallback(() => {
    setDecoded("");
    setEncoded("");
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

  const decodedCopyButton = useMemo(() => <CopyButton text={decoded} />, [decoded]);
  const encodedCopyButton = useMemo(() => <CopyButton text={encoded} />, [encoded]);

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
    <PageRootSection title={toolGroups.encodersDecoders.tools.url.longTitle}>
      <PageSection title="Decoded" control={decodedControl}>
        <Textarea value={decoded} onChange={onDecodedChange} rows={10} />
      </PageSection>
      <PageSection title="Encoded" control={encodedControl}>
        <Textarea value={encoded} onChange={onEncodedChange} rows={10} />
      </PageSection>
    </PageRootSection>
  );
}
