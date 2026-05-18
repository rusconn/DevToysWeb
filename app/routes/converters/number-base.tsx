import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { LabeledSwitch } from "../../components/labeled-switch";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import * as icons from "../../components/primitives/icons";
import { Input, type InputProps } from "../../components/primitives/input";

import { usePage } from "./+number-base/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: toolGroups.converters.tools.numberBase.longTitle },
  {
    name: "description",
    content: toolGroups.converters.tools.numberBase.description,
  },
  { name: "googlebot", content: "index" },
];

export default function NumberBase() {
  const { format, setFormat, dec, trySetDec, hex, trySetHex, oct, trySetOct, bin, trySetBin } =
    usePage();

  const tryChangeDec: InputProps["onChange"] = e => {
    trySetDec(e.currentTarget.value);
  };
  const tryChangeHex: InputProps["onChange"] = e => {
    trySetHex(e.currentTarget.value);
  };
  const tryChangeOct: InputProps["onChange"] = e => {
    trySetOct(e.currentTarget.value);
  };
  const tryChangeBin: InputProps["onChange"] = e => {
    trySetBin(e.currentTarget.value);
  };

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

  const decControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={trySetDec} />
      </ControlMenuItem>
    </ControlMenu>
  );
  const hexControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={trySetHex} />
      </ControlMenuItem>
    </ControlMenu>
  );
  const octControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={trySetOct} />
      </ControlMenuItem>
    </ControlMenu>
  );
  const binControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={trySetBin} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.converters.tools.numberBase.longTitle}>
      <PageSection title="Configuration">
        <Configuration>{formatNumberConfig}</Configuration>
      </PageSection>
      <div className="flex flex-col gap-3">
        <PageSectionWithControl title="Decimal" control={decControl}>
          <Input value={dec} onChange={tryChangeDec} />
        </PageSectionWithControl>
        <PageSectionWithControl title="Hexadecimal" control={hexControl}>
          <Input value={hex} onChange={tryChangeHex} />
        </PageSectionWithControl>
        <PageSectionWithControl title="Octal" control={octControl}>
          <Input value={oct} onChange={tryChangeOct} />
        </PageSectionWithControl>
        <PageSectionWithControl title="Binary" control={binControl}>
          <Input value={bin} onChange={tryChangeBin} />
        </PageSectionWithControl>
      </div>
    </PageRootSection>
  );
}
