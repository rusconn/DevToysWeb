"use client";

import { toolGroups } from "../../_config/tools";
import * as icons from "../../_components/primitives/icons";
import { Input, type InputProps } from "../../_components/primitives/input";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { LabeledSwitch } from "../../_components/labeled-switch";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { usePage } from "./use-page";

export default function ClientBoundary() {
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
        <PageSection title="Decimal" control={decControl}>
          <Input value={dec} onChange={tryChangeDec} />
        </PageSection>
        <PageSection title="Hexadecimal" control={hexControl}>
          <Input value={hex} onChange={tryChangeHex} />
        </PageSection>
        <PageSection title="Octal" control={octControl}>
          <Input value={oct} onChange={tryChangeOct} />
        </PageSection>
        <PageSection title="Binary" control={binControl}>
          <Input value={bin} onChange={tryChangeBin} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
