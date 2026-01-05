"use client";

import { toolGroups } from "../../_config/tools";
import { Textarea, type TextareaProps } from "../../_components/primitives/textarea";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { usePage } from "./use-page";

export default function ClientBoundary() {
  const { fields, setFieldsByDecoded, setFieldsByEncoded, clearFields } = usePage();

  const changeFieldsByDecoded: TextareaProps["onChange"] = e => {
    setFieldsByDecoded(e.currentTarget.value);
  };
  const changeFieldsByEncoded: TextareaProps["onChange"] = e => {
    setFieldsByEncoded(e.currentTarget.value);
  };

  const clearButton = (
    <Button.Clear onClick={clearFields} iconOnly aria-label="clear decoded and encoded" />
  );

  const decodedControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFieldsByDecoded} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setFieldsByDecoded} iconOnly aria-label="load a decoded file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={fields.decoded} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );
  const encodedControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFieldsByEncoded} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setFieldsByEncoded} iconOnly aria-label="load a encoded file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={fields.encoded} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.url.longTitle}>
      <div className="flex flex-col gap-3">
        <PageSection title="Decoded" control={decodedControl}>
          <Textarea value={fields.decoded} onChange={changeFieldsByDecoded} rows={10} />
        </PageSection>
        <PageSection title="Encoded" control={encodedControl}>
          <Textarea value={fields.encoded} onChange={changeFieldsByEncoded} rows={10} />
        </PageSection>
      </div>
    </PageRootSection>
  );
}
