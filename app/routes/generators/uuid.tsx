"use client";

import { toolGroups } from "../../config/tools";
import {
  Configuration,
  ConfigurationItem,
  ConfigurationItemWithDesciption,
} from "../../components/configuration";
import { Clear, Copy } from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { LabeledSwitch } from "../../components/labeled-switch";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import { Button } from "../../components/primitives/button";
import * as icons from "../../components/primitives/icons";
import { Input, type InputProps } from "../../components/primitives/input";
import * as Select from "../../components/primitives/select";
import { Textarea } from "../../components/primitives/textarea";

import { pageTitle } from "../../utils/title";
import type { Route } from "./+types";
import { type UuidVersion, versions } from "./+uuid/lib";
import { usePage } from "./+uuid/use-page";

export const meta: Route.MetaFunction = () => [
  { title: pageTitle(toolGroups.generators.tools.uuid.longTitle) },
  {
    name: "description",
    content: toolGroups.generators.tools.uuid.description,
  },
  { name: "googlebot", content: "index" },
];

export default function Uuid() {
  const {
    hyphens,
    setHyphens,
    uppercase,
    setUppercase,
    uuidVersion,
    setUuidVersion,
    generate,
    generates,
    setGenerates,
    uuids,
    clearUuids,
    uuidsRef,
  } = usePage();

  const uuidsString = uuids.join("\n");

  const changeUuidVersion: Select.Props["onValueChange"] = value => {
    setUuidVersion(value as UuidVersion);
  };

  const tryChangeGenerates: InputProps["onChange"] = e => {
    const newGenerates = Number(e.currentTarget.value);
    if (1 <= newGenerates && newGenerates <= 1000) {
      setGenerates(newGenerates);
    }
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
    <ConfigurationItemWithDesciption
      icon={<icons.Settings2 size={24} />}
      title="UUID version"
      description="Choose the version of UUID to generate"
      control={
        <Select.Root value={uuidVersion} onValueChange={changeUuidVersion}>
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
      <PageSectionWithControl className="-mt-3" title="UUID(s)" control={uuidsControl}>
        <Textarea ref={uuidsRef} value={uuidsString} rows={10} readOnly />
      </PageSectionWithControl>
    </PageRootSection>
  );
}
