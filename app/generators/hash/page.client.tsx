"use client";

import { toolGroups } from "../../_config/tools";
import * as icons from "../../_components/primitives/icons";
import { Input } from "../../_components/primitives/input";
import { Textarea, type TextareaProps } from "../../_components/primitives/textarea";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { LabeledSwitch } from "../../_components/labeled-switch";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { usePage } from "./use-page";

export default function ClientBoundary() {
  const { uppercase, setUppercase, input, setInput, clearInput, md5, sha1, sha256, sha512 } =
    usePage();

  const changeInput: TextareaProps["onChange"] = e => {
    setInput(e.currentTarget.value);
  };

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
      <PageSection className="-mt-2" title="Input" control={inputControl}>
        <Textarea value={input} onChange={changeInput} rows={5} />
      </PageSection>
      <div className="flex flex-col gap-3">
        <PageSection title="MD5">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input value={md5} readOnly />
            {md5Control}
          </div>
        </PageSection>
        <PageSection title="SHA1">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input value={sha1} readOnly />
            {sha1Control}
          </div>
        </PageSection>
        <PageSection title="SHA256">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input value={sha256} readOnly />
            {sha256Control}
          </div>
        </PageSection>
        <PageSection title="SHA512">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input value={sha512} readOnly />
            {sha512Control}
          </div>
        </PageSection>
      </div>
    </PageRootSection>
  );
}
