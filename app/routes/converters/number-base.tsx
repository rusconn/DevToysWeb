import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { LabeledSwitch } from "../../components/labeled-switch";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import * as icons from "../../components/primitives/icons";
import { Input } from "../../components/primitives/input";

import { indexMeta } from "../../utils/meta";
import { usePage } from "./+number-base/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.converters.tools.numberBase);
};

export default function NumberBase() {
  const { format, setFormat, dec, trySetDec, hex, trySetHex, oct, trySetOct, bin, trySetBin } =
    usePage();

  const formatNumberConfig = (
    <ConfigurationItem
      icon={<icons.CaseSensitive size={24} />}
      title="Format number"
      control={
        <LabeledSwitch
          id="format-number-switch"
          label={format ? "On" : "Off"}
          checked={format}
          onCheckedChange={setFormat}
          aria-label="toggle whether to format numbers"
        />
      }
    />
  );

  return (
    <PageRootSection title={toolGroups.converters.tools.numberBase.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{formatNumberConfig}</Configuration>
      </PageSection>

      <div className="flex flex-col gap-3">
        <NumberBaseSection title="Decimal" value={dec} onValueChange={trySetDec} />
        <NumberBaseSection title="Hexadecimal" value={hex} onValueChange={trySetHex} />
        <NumberBaseSection title="Octal" value={oct} onValueChange={trySetOct} />
        <NumberBaseSection title="Binary" value={bin} onValueChange={trySetBin} />
      </div>
    </PageRootSection>
  );
}

type NumberBaseSectionProps = {
  title: string;
  value: string;
  onValueChange: (value: string) => void;
};

function NumberBaseSection({ title, value, onValueChange }: NumberBaseSectionProps) {
  const control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={onValueChange} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageSectionWithControl title={title} control={control}>
      <Input value={value} onChange={e => onValueChange(e.currentTarget.value)} />
    </PageSectionWithControl>
  );
}
