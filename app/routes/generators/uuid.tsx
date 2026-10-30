import type { SubmitEventHandler } from "react";

import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
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

import { indexMeta } from "../../utils/meta";
import type { Route } from "./+types";
import { type UuidVersion, versions } from "./+uuid/lib";
import { usePage } from "./+uuid/use-page";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.generators.tools.uuid);
};

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

  const tryChangeGenerates: InputProps["onChange"] = e => {
    const newGenerates = Number(e.currentTarget.value);
    if (1 <= newGenerates && newGenerates <= 1000) {
      setGenerates(newGenerates);
    }
  };

  const submitGenerate: SubmitEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    generate();
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
        <Select.Root
          items={{ [versions.v1]: "1", [versions.v4]: "4 (GUID)" }}
          value={uuidVersion}
          onValueChange={value => setUuidVersion(value as UuidVersion)}
        >
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
        <form
          className="flex items-center gap-2"
          aria-label="Generate UUIDs"
          onSubmit={submitGenerate}
        >
          <Button type="submit" variant="accent">
            Generate UUID(s)
          </Button>
          <span>×</span>
          <div className="w-24">
            <Input
              type="number"
              name="generates"
              aria-label="Number of UUIDs to generate"
              min={1}
              max={1000}
              step={1}
              enterKeyHint="go"
              value={generates}
              onChange={tryChangeGenerates}
            />
          </div>
        </form>
      </PageSection>

      <PageSectionWithControl className="-mt-3" title="UUID(s)" control={uuidsControl}>
        <Textarea ref={uuidsRef} value={uuidsString} rows={10} readOnly />
      </PageSectionWithControl>
    </PageRootSection>
  );
}
