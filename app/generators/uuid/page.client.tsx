"use client";

import { useState } from "react";

import { toolGroups } from "../../_config/tools";
import { Button } from "../../_components/primitives/button";
import * as icons from "../../_components/primitives/icons";
import { Input, type InputProps } from "../../_components/primitives/input";
import * as Select from "../../_components/primitives/select";
import { Textarea } from "../../_components/primitives/textarea";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import { Clear, Copy } from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { LabeledSwitch } from "../../_components/labeled-switch";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { useAutoScroll } from "./hooks";
import { uuid } from "./lib";

const versions = {
  v1: "1",
  v4: "4",
} as const;

type UuidVersion = (typeof versions)[keyof typeof versions];

function isUuidVersion(s: string): s is UuidVersion {
  return Object.values(versions).includes(s as UuidVersion);
}

export default function ClientBoundary() {
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>("4");
  const [generates, setGenerates] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const ref = useAutoScroll<HTMLTextAreaElement>([uuids]);

  const uuidsString = uuids.join("\n");

  const clearUuids = () => setUuids([]);

  const tryChangeUuidVersion: NonNullable<Select.Props["onValueChange"]> = value => {
    if (isUuidVersion(value)) {
      setUuidVersion(value);
    }
  };

  const tryChangeGenerates: NonNullable<InputProps["onChange"]> = e => {
    const newGenerates = Number(e.currentTarget.value);
    if (1 <= newGenerates && newGenerates <= 1000) {
      setGenerates(newGenerates);
    }
  };

  const generate = () => {
    const newUuids = Array.from({ length: generates }, () => uuid(uuidVersion, hyphens, uppercase));
    setUuids([...uuids, ...newUuids]);
  };

  const hyphensConfig = (
    <ConfigurationItem
      icon={<icons.Minus size={24} />}
      title="Hyphens"
      control={
        <LabeledSwitch
          id="hyphens-switch"
          label={hyphens ? "On" : "Off"}
          checked={hyphens}
          onCheckedChange={setHyphens}
          aria-label="toggle whether to add hyphens"
        />
      }
    />
  );

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

  const uuidVersionConfig = (
    <ConfigurationItem
      icon={<icons.Settings2 size={24} />}
      title="UUID version"
      description="Choose the version of UUID to generate"
      control={
        <Select.Root value={uuidVersion} onValueChange={tryChangeUuidVersion}>
          <Select.Trigger aria-label="toggle open/close state of uuid version selection">
            <Select.Value placeholder={uuidVersion} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={versions.v1}>1</Select.Item>
            <Select.Item value={versions.v4}>4 (GUID)</Select.Item>
          </Select.Content>
        </Select.Root>
      }
    />
  );

  const uuidsControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Copy text={uuidsString} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Clear onClick={clearUuids} iconOnly aria-label="clear uuids" />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.generators.tools.uuid.longTitle}>
      <PageSection title="Configuration">
        <Configuration>
          {hyphensConfig}
          {uppercaseConfig}
          {uuidVersionConfig}
        </Configuration>
      </PageSection>
      <PageSection title="Generate">
        <div className="flex items-center gap-2">
          <Button variant="accent" onClick={generate}>
            Generate UUID(s)
          </Button>
          <span>×</span>
          <div className="w-24">
            <Input type="number" value={generates} onChange={tryChangeGenerates} />
          </div>
        </div>
      </PageSection>
      <PageSection className="-mt-3" title="UUID(s)" control={uuidsControl}>
        <Textarea ref={ref} value={uuidsString} rows={10} readOnly />
      </PageSection>
    </PageRootSection>
  );
}
