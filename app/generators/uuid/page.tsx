"use client";

import { useCallback, useState } from "react";
import { range } from "fp-ts/NonEmptyArray";
import * as t from "io-ts";

import { toolGroups } from "@/config/tools";
import { uuid } from "@/lib/uuid";
import { useScrollFollow } from "@/hooks/useScrollFollow";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectProps,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ClearButton } from "@/components/buttons/clear";
import { CopyButton } from "@/components/buttons/copy";
import { Configuration } from "@/components/configuration";
import { Configurations } from "@/components/configurations";
import { ControlMenu } from "@/components/control-menu";
import { icons } from "@/components/icons";
import { LabeledSwitch } from "@/components/labeled-switch";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

const versions = {
  v1: "1",
  v4: "4",
} as const;

const uuidVersions = t.keyof({ [versions.v1]: null, [versions.v4]: null });
type UuidVersion = t.TypeOf<typeof uuidVersions>;

export default function Page() {
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>("4");
  const [generates, setGenerates] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const ref = useScrollFollow<HTMLTextAreaElement>([uuids]);

  const uuidsString = uuids.join("\n");

  const clearUuids = useCallback(() => setUuids([]), []);

  const onUuidVersionChange: NonNullable<SelectProps["onValueChange"]> = useCallback(value => {
    if (uuidVersions.is(value)) {
      setUuidVersion(value);
    }
  }, []);

  const onGeneratesChange: NonNullable<InputProps["onChange"]> = useCallback(
    ({ currentTarget: { value } }) => {
      const newGenerates = Number(value);

      if (newGenerates >= 1 && newGenerates <= 1000) {
        setGenerates(newGenerates);
      }
    },
    []
  );

  const onGenerateClick = () => {
    const newUuids = range(1, generates).map(_ => uuid(uuidVersion, hyphens, uppercase));
    setUuids([...uuids, ...newUuids]);
  };

  const hyphensConfig = (
    <Configuration
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

  const uuidVersionConfig = (
    <Configuration
      icon={<icons.Settings2 size={24} />}
      title="UUID version"
      description="Choose the version of UUID to generate"
      control={
        <Select value={uuidVersion} onValueChange={onUuidVersionChange}>
          <SelectTrigger
            className="w-28"
            aria-label="toggle open/close state of uuid version selection"
          >
            <SelectValue placeholder={uuidVersion} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={versions.v1}>1</SelectItem>
            <SelectItem value={versions.v4}>4 (GUID)</SelectItem>
          </SelectContent>
        </Select>
      }
    />
  );

  const uuidsCopyButton = <CopyButton text={uuidsString} />;
  const uuidsClearButton = <ClearButton onClick={clearUuids} iconOnly aria-label="clear uuids" />;

  const uuidsControl = <ControlMenu list={[uuidsCopyButton, uuidsClearButton]} />;

  return (
    <PageRootSection title={toolGroups.generators.tools.uuid.longTitle}>
      <PageSection title="Configuration">
        <Configurations list={[hyphensConfig, uppercaseConfig, uuidVersionConfig]} />
      </PageSection>
      <PageSection className="mt-6" title="Generate">
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onGenerateClick}>
            Generate UUID(s)
          </Button>
          <span>×</span>
          <Input
            className="w-24 font-sans"
            type="number"
            value={generates}
            onChange={onGeneratesChange}
          />
        </div>
      </PageSection>
      <PageSection title="UUID(s)" control={uuidsControl}>
        <Textarea {...{ ref }} value={uuidsString} rows={10} readOnly />
      </PageSection>
    </PageRootSection>
  );
}
