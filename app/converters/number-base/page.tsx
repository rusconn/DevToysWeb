"use client";

import { useState } from "react";

import { toolGroups } from "@/config/tools";
import * as baselib from "@/lib/base";
import { Input, InputProps } from "@/components/ui/input";
import * as Button from "@/components/buttons";
import { Configuration } from "@/components/configuration";
import { Configurations } from "@/components/configurations";
import { ControlMenu } from "@/components/control-menu";
import * as icons from "@/components/icons";
import { LabeledSwitch } from "@/components/labeled-switch";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

const baseConfig = {
  10: { prefix: "", validate: baselib.isDecimal },
  16: { prefix: "0x", validate: baselib.isHexadecimal },
  8: { prefix: "0o", validate: baselib.isOctal },
  2: { prefix: "0b", validate: baselib.isBinary },
} as const;

export default function Page() {
  const [format, setFormat] = useState(true);
  const [int, setInt] = useState<bigint | undefined>(BigInt(42));

  const newDec = int?.toString(10) ?? "";
  const newHex = int?.toString(16).toUpperCase() ?? "";
  const newOct = int?.toString(8) ?? "";
  const newBin = int?.toString(2) ?? "";

  const dec = format ? baselib.formatDecimal(newDec) : newDec;
  const hex = format ? baselib.formatHexadecimal(newHex) : newHex;
  const oct = format ? baselib.formatOctal(newOct) : newOct;
  const bin = format ? baselib.formatBinary(newBin) : newBin;

  const trySetInt = (base: 10 | 16 | 8 | 2) => (value: string) => {
    if (value === "") {
      return setInt(undefined);
    }

    const { prefix, validate } = baseConfig[base];
    const unformatted = baselib.unformatNumber(value);

    if (validate(unformatted)) {
      setInt(BigInt(`${prefix}${unformatted}`));
    }
  };

  const trySetDec = (value: string) => trySetInt(10)(value);
  const trySetHex = (value: string) => trySetInt(16)(value);
  const trySetOct = (value: string) => trySetInt(8)(value);
  const trySetBin = (value: string) => trySetInt(2)(value);

  const onDecChange: InputProps["onChange"] = e => trySetDec(e.currentTarget.value);
  const onHexChange: InputProps["onChange"] = e => trySetHex(e.currentTarget.value);
  const onOctChange: InputProps["onChange"] = e => trySetOct(e.currentTarget.value);
  const onBinChange: InputProps["onChange"] = e => trySetBin(e.currentTarget.value);

  const formatNumberConfig = (
    <Configuration
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
  const decPasteButton = <Button.Paste onClipboardRead={trySetDec} />;
  const hexPasteButton = <Button.Paste onClipboardRead={trySetHex} />;
  const octPasteButton = <Button.Paste onClipboardRead={trySetOct} />;
  const binPasteButton = <Button.Paste onClipboardRead={trySetBin} />;

  const decControl = <ControlMenu list={[decPasteButton]} />;
  const hexControl = <ControlMenu list={[hexPasteButton]} />;
  const octControl = <ControlMenu list={[octPasteButton]} />;
  const binControl = <ControlMenu list={[binPasteButton]} />;

  return (
    <PageRootSection title={toolGroups.converters.tools.numberBase.longTitle}>
      <PageSection title="Configuration">
        <Configurations list={[formatNumberConfig]} />
      </PageSection>
      <div className="flex flex-col gap-3">
        <PageSection title="Decimal" control={decControl}>
          <Input fontMono value={dec} onChange={onDecChange} />
        </PageSection>
        <PageSection title="Hexadecimal" control={hexControl}>
          <Input fontMono value={hex} onChange={onHexChange} />
        </PageSection>
        <PageSection title="Octal" control={octControl}>
          <Input fontMono value={oct} onChange={onOctChange} />
        </PageSection>
        <PageSection title="Binary" control={binControl}>
          <Input fontMono value={bin} onChange={onBinChange} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
