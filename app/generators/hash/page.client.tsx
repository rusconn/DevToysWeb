"use client";

import { useState } from "react";
import MD5 from "crypto-js/md5";
import SHA1 from "crypto-js/sha1";
import SHA256 from "crypto-js/sha256";
import SHA512 from "crypto-js/sha512";

import { toolGroups } from "../../_config/tools";
import * as icons from "../../_components/primitives/icons";
import { Input } from "../../_components/primitives/input";
import { Textarea, TextareaProps } from "../../_components/primitives/textarea";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { LabeledSwitch } from "../../_components/labeled-switch";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

export default function ClientBoundary() {
  const [uppercase, setUppercase] = useState(false);
  const [input, setInput] = useState("Hello there !");

  const newMd5 = MD5(input).toString();
  const newSha1 = SHA1(input).toString();
  const newSha256 = SHA256(input).toString();
  const newSha512 = SHA512(input).toString();

  const md5 = uppercase ? newMd5.toUpperCase() : newMd5;
  const sha1 = uppercase ? newSha1.toUpperCase() : newSha1;
  const sha256 = uppercase ? newSha256.toUpperCase() : newSha256;
  const sha512 = uppercase ? newSha512.toUpperCase() : newSha512;

  const clearInput = () => setInput("");

  const onInputChange: TextareaProps["onChange"] = e => setInput(e.currentTarget.value);

  const uppercaseConfig = (
    <ConfigurationItem
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

  const inputControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setInput} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setInput} iconOnly aria-label="load a file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearInput} iconOnly aria-label="clear input" />
      </ControlMenuItem>
    </ControlMenu>
  );

  const md5Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={md5} iconOnly aria-label="copy generated md5" />
      </ControlMenuItem>
    </ControlMenu>
  );
  const sha1Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={sha1} iconOnly aria-label="copy generated sha1" />
      </ControlMenuItem>
    </ControlMenu>
  );
  const sha256Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={sha256} iconOnly aria-label="copy generated sha256" />
      </ControlMenuItem>
    </ControlMenu>
  );
  const sha512Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={sha512} iconOnly aria-label="copy generated sha512" />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.generators.tools.hash.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{uppercaseConfig}</Configuration>
      </PageSection>
      <PageSection title="Input" control={inputControl}>
        <Textarea value={input} onChange={onInputChange} rows={5} />
      </PageSection>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <PageSection title="MD5">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.5rem" }}>
            <Input value={md5} readOnly />
            {md5Control}
          </div>
        </PageSection>
        <PageSection title="SHA1">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.5rem" }}>
            <Input value={sha1} readOnly />
            {sha1Control}
          </div>
        </PageSection>
        <PageSection title="SHA256">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.5rem" }}>
            <Input value={sha256} readOnly />
            {sha256Control}
          </div>
        </PageSection>
        <PageSection title="SHA512">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.5rem" }}>
            <Input value={sha512} readOnly />
            {sha512Control}
          </div>
        </PageSection>
      </div>
    </PageRootSection>
  );
}
