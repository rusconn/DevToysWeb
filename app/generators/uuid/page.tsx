"use client";

import { useCallback, useMemo, useState } from "react";

import { toolGroups } from "@/config/tools";
import { uuid } from "@/lib/uuid";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import * as Select from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clear } from "@/components/buttons/clear";
import { Copy } from "@/components/buttons/copy";
import { Configuration, ConfigurationItem } from "@/components/configuration";
import { ControlMenu, ControlMenuItem } from "@/components/control-menu";
import * as icons from "@/components/icons";
import { LabeledSwitch } from "@/components/labeled-switch";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

const versions = {
  v1: "1",
  v4: "4",
} as const;

type UuidVersion = (typeof versions)[keyof typeof versions];

function isUuidVersion(s: string): s is UuidVersion {
  return Object.values(versions).includes(s as UuidVersion);
}

export default function Page() {
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>("4");
  const [generates, setGenerates] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const ref = useAutoScroll<HTMLTextAreaElement>([uuids]);

  const uuidsString = useMemo(() => uuids.join("\n"), [uuids]);

  const clearUuids = useCallback(() => setUuids([]), []);

  const onUuidVersionChange: NonNullable<Select.Props["onValueChange"]> = useCallback(value => {
    if (isUuidVersion(value)) {
      setUuidVersion(value);
    }
  }, []);

  const onGeneratesChange: NonNullable<InputProps["onChange"]> = useCallback(e => {
    const newGenerates = Number(e.currentTarget.value);

    if (newGenerates >= 1 && newGenerates <= 1000) {
      setGenerates(newGenerates);
    }
  }, []);

  const onGenerateClick = () => {
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
        <Select.Root value={uuidVersion} onValueChange={onUuidVersionChange}>
          <Select.Trigger
            className="w-28"
            aria-label="toggle open/close state of uuid version selection"
          >
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
          <Button variant="secondary" onClick={onGenerateClick}>
            Generate UUID(s)
          </Button>
          <span>×</span>
          <Input className="w-24" type="number" value={generates} onChange={onGeneratesChange} />
        </div>
      </PageSection>
      <PageSection className="-mt-3" title="UUID(s)" control={uuidsControl}>
        <Textarea {...{ ref }} value={uuidsString} rows={10} readOnly />
      </PageSection>
    </PageRootSection>
  );
}
