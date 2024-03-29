"use client";

import { useCallback, useState } from "react";
import createHash from "create-hash";

import { toolGroups } from "@/config/tools";
import { Input } from "@/components/ui/input";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import * as Button from "@/components/buttons";
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

  const onInputChange: TextareaProps["onChange"] = e => setInput(e.currentTarget.value);

  const uppercaseConfig = (
    <Configuration
      icon={<icons.CaseSensitive size={24} />}
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
  );

  const inputPasteButton = <Button.Paste onClipboardRead={setInput} />;
  const inputFileButton = <Button.File onFileRead={setInput} iconOnly aria-label="load a file" />;
  const inputClearButton = <Button.Clear onClick={clearInput} iconOnly aria-label="clear input" />;

  const inputControl = <ControlMenu list={[inputPasteButton, inputFileButton, inputClearButton]} />;

  const md5CopyButton = <Button.Copy text={md5} iconOnly aria-label="copy generated md5" />;
  const sha1CopyButton = <Button.Copy text={sha1} iconOnly aria-label="copy generated sha1" />;
  const sha256CopyButton = (
    <Button.Copy text={sha256} iconOnly aria-label="copy generated sha256" />
  );
  const sha512CopyButton = (
    <Button.Copy text={sha512} iconOnly aria-label="copy generated sha512" />
  );

  return (
    <PageRootSection title={toolGroups.generators.tools.hash.longTitle}>
      <PageSection title="Configuration">
        <Configurations list={[uppercaseConfig]} />
      </PageSection>
      <PageSection className="-mt-2" title="Input" control={inputControl}>
        <Textarea value={input} onChange={onInputChange} rows={5} />
      </PageSection>
      <div className="flex flex-col gap-3">
        <PageSection title="MD5">
          <div className="flex gap-2">
            <Input fontMono className="flex-1" value={md5} readOnly />
            <ControlMenu list={[md5CopyButton]} />
          </div>
        </PageSection>
        <PageSection title="SHA1">
          <div className="flex gap-2">
            <Input fontMono className="flex-1" value={sha1} readOnly />
            <ControlMenu list={[sha1CopyButton]} />
          </div>
        </PageSection>
        <PageSection title="SHA256">
          <div className="flex gap-2">
            <Input fontMono className="flex-1" value={sha256} readOnly />
            <ControlMenu list={[sha256CopyButton]} />
          </div>
        </PageSection>
        <PageSection title="SHA512">
          <div className="flex gap-2">
            <Input fontMono className="flex-1" value={sha512} readOnly />
            <ControlMenu list={[sha512CopyButton]} />
          </div>
        </PageSection>
      </div>
    </PageRootSection>
  );
}
