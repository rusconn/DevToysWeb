"use client";

import { useState } from "react";

import { toolGroups } from "../../_config/tools";
import * as icons from "../../_components/primitives/icons";
import { Input, InputProps } from "../../_components/primitives/input";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { LabeledSwitch } from "../../_components/labeled-switch";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import {
  formatBinary,
  formatDecimal,
  formatHexadecimal,
  formatOctal,
  isBinary,
  isDecimal,
  isHexadecimal,
  isOctal,
  unformatNumber,
} from "./lib";

const baseConfig = {
  10: { prefix: "", validate: isDecimal },
  16: { prefix: "0x", validate: isHexadecimal },
  8: { prefix: "0o", validate: isOctal },
  2: { prefix: "0b", validate: isBinary },
} as const;

export default function ClientBoundary() {
  const [format, setFormat] = useState(true);
  const [int, setInt] = useState<bigint | undefined>(BigInt(42));

  const newDec = int?.toString(10) ?? "";
  const newHex = int?.toString(16).toUpperCase() ?? "";
  const newOct = int?.toString(8) ?? "";
  const newBin = int?.toString(2) ?? "";

  const dec = format ? formatDecimal(newDec) : newDec;
  const hex = format ? formatHexadecimal(newHex) : newHex;
  const oct = format ? formatOctal(newOct) : newOct;
  const bin = format ? formatBinary(newBin) : newBin;

  const trySetInt = (base: 10 | 16 | 8 | 2) => (value: string) => {
    if (value === "") {
      return setInt(undefined);
    }

    const { prefix, validate } = baseConfig[base];
    const unformatted = unformatNumber(value);

    if (validate(unformatted)) {
      setInt(BigInt(`${prefix}${unformatted}`));
    }
  };

  const trySetDec = trySetInt(10);
  const trySetHex = trySetInt(16);
  const trySetOct = trySetInt(8);
  const trySetBin = trySetInt(2);

  const onDecChange: InputProps["onChange"] = e => trySetDec(e.currentTarget.value);
  const onHexChange: InputProps["onChange"] = e => trySetHex(e.currentTarget.value);
  const onOctChange: InputProps["onChange"] = e => trySetOct(e.currentTarget.value);
  const onBinChange: InputProps["onChange"] = e => trySetBin(e.currentTarget.value);

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
          <Input value={dec} onChange={onDecChange} />
        </PageSection>
        <PageSection title="Hexadecimal" control={hexControl}>
          <Input value={hex} onChange={onHexChange} />
        </PageSection>
        <PageSection title="Octal" control={octControl}>
          <Input value={oct} onChange={onOctChange} />
        </PageSection>
        <PageSection title="Binary" control={binControl}>
          <Input value={bin} onChange={onBinChange} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
