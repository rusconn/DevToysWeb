"use client";

import { useCallback, useMemo, useState } from "react";
import createHash from "create-hash";

import { toolGroups } from "@/config/tools";
import { Input } from "@/components/ui/input";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { ClearButton } from "@/components/buttons/clear";
import { CopyButton } from "@/components/buttons/copy";
import { FileButton } from "@/components/buttons/file";
import { PasteButton } from "@/components/buttons/paste";
import { Configuration } from "@/components/configuration";
import { Configurations } from "@/components/configurations";
import { ControlMenu } from "@/components/control-menu";
import { icons } from "@/components/icons";
import { LabeledSwitch } from "@/components/labeled-switch";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

export default function Page() {
  const [uppercase, setUppercase] = useState(false);
  const [input, setInput] = useState("Hello there !");

  const newMd5 = createHash("md5").update(input).digest("hex");
  const newSha1 = createHash("sha1").update(input).digest("hex");
  const newSha256 = createHash("sha256").update(input).digest("hex");
  const newSha512 = createHash("sha512").update(input).digest("hex");

  const md5 = uppercase ? newMd5.toUpperCase() : newMd5;
  const sha1 = uppercase ? newSha1.toUpperCase() : newSha1;
  const sha256 = uppercase ? newSha256.toUpperCase() : newSha256;
  const sha512 = uppercase ? newSha512.toUpperCase() : newSha512;

  const clearInput = useCallback(() => setInput(""), []);

  const onInputChange: TextareaProps["onChange"] = ({ currentTarget: { value } }) =>
    setInput(value);

  const uppercaseIcon = useMemo(() => <icons.CaseSensitive size={24} />, []);

  const uppercaseConfig = useMemo(
    () => (
      <Configuration
        icon={uppercaseIcon}
        title="Uppercase"
        control={
          <LabeledSwitch
            id="uppercase-switch"
            label={uppercase ? "On" : "Off"}
            checked={uppercase}
            onCheckedChange={setUppercase}
            aria-label="toggle whether to generate in uppercase"
          />
        }
      />
    ),
    [uppercase, uppercaseIcon]
  );

  const inputPasteButton = useMemo(() => <PasteButton onClipboardRead={setInput} />, []);

  const inputFileButton = useMemo(
    () => <FileButton onFileRead={setInput} iconOnly aria-label="load a file" />,
    []
  );

  const inputClearButton = useMemo(
    () => <ClearButton onClick={clearInput} iconOnly aria-label="clear input" />,
    [clearInput]
  );

  const inputControl = <ControlMenu list={[inputPasteButton, inputFileButton, inputClearButton]} />;

  const md5CopyButton = useMemo(
    () => <CopyButton text={md5} iconOnly aria-label="copy generated md5" />,
    [md5]
  );

  const sha1CopyButton = useMemo(
    () => <CopyButton text={sha1} iconOnly aria-label="copy generated sha1" />,
    [sha1]
  );

  const sha256CopyButton = useMemo(
    () => <CopyButton text={sha256} iconOnly aria-label="copy generated sha256" />,
    [sha256]
  );

  const sha512CopyButton = useMemo(
    () => <CopyButton text={sha512} iconOnly aria-label="copy generated sha512" />,
    [sha512]
  );

  return (
    <PageRootSection title={toolGroups.generators.tools.hash.longTitle}>
      <PageSection title="Configuration">
        <Configurations list={[uppercaseConfig]} />
      </PageSection>
      <PageSection className="my-4" title="Input" control={inputControl}>
        <Textarea value={input} onChange={onInputChange} rows={5} />
      </PageSection>
      <PageSection title="MD5">
        <div className="flex gap-2">
          <Input className="flex-1" value={md5} readOnly />
          <ControlMenu list={[md5CopyButton]} />
        </div>
      </PageSection>
      <PageSection title="SHA1">
        <div className="flex gap-2">
          <Input className="flex-1" value={sha1} readOnly />
          <ControlMenu list={[sha1CopyButton]} />
        </div>
      </PageSection>
      <PageSection title="SHA256">
        <div className="flex gap-2">
          <Input className="flex-1" value={sha256} readOnly />
          <ControlMenu list={[sha256CopyButton]} />
        </div>
      </PageSection>
      <PageSection title="SHA512">
        <div className="flex gap-2">
          <Input className="flex-1" value={sha512} readOnly />
          <ControlMenu list={[sha512CopyButton]} />
        </div>
      </PageSection>
    </PageRootSection>
  );
}
