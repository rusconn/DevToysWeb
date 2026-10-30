import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { LabeledSwitch } from "../../components/labeled-switch";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import * as icons from "../../components/primitives/icons";
import { Input } from "../../components/primitives/input";
import { Textarea } from "../../components/primitives/textarea";

import { indexMeta } from "../../utils/meta";
import { usePage } from "./+hash/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.generators.tools.hash);
};

export default function Hash() {
  const { uppercase, setUppercase, input, setInput, clearInput, md5, sha1, sha256, sha512 } =
    usePage();

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

  return (
    <PageRootSection title={toolGroups.generators.tools.hash.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{uppercaseConfig}</Configuration>
      </PageSection>

      <PageSectionWithControl className="-mt-2" title="Input" control={inputControl}>
        <Textarea value={input} onChange={e => setInput(e.currentTarget.value)} rows={5} />
      </PageSectionWithControl>

      <div className="flex flex-col gap-3">
        <HashSection title="MD5" kind="md5" value={md5} />
        <HashSection title="SHA1" kind="sha1" value={sha1} />
        <HashSection title="SHA256" kind="sha256" value={sha256} />
        <HashSection title="SHA512" kind="sha512" value={sha512} />
      </div>
    </PageRootSection>
  );
}

type HashSectionProps = {
  title: string;
  kind: string;
  value: string;
};

function HashSection({ title, kind, value }: HashSectionProps) {
  return (
    <PageSection title={title}>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Input value={value} readOnly />
        <ControlMenu>
          <ControlMenuItem>
            <Button.Copy text={value} iconOnly aria-label={`copy generated ${kind}`} />
          </ControlMenuItem>
        </ControlMenu>
      </div>
    </PageSection>
  );
}
