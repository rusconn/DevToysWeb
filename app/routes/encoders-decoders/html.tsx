import { toolGroups } from "../../config/tools";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { PageRootSection } from "../../components/page-root-section";
import { PageSectionWithControl } from "../../components/page-section";
import { Textarea } from "../../components/primitives/textarea";

import { indexMeta } from "../../utils/meta";
import { usePage } from "./+html/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.encodersDecoders.tools.html);
};

export default function Html() {
  const { fields, setFieldsByDecoded, setFieldsByEncoded } = usePage();

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.html.longTitle}>
      <div className="flex flex-col gap-3">
        <CodeSection
          title="Decoded"
          kind="decoded"
          value={fields.decoded}
          onValueChange={setFieldsByDecoded}
        />
        <CodeSection
          title="Encoded"
          kind="encoded"
          value={fields.encoded}
          onValueChange={setFieldsByEncoded}
        />
      </div>
    </PageRootSection>
  );
}

type CodeSectionProps = {
  title: string;
  kind: string;
  value: string;
  onValueChange: (value: string) => void;
};

function CodeSection({ title, kind, value, onValueChange }: CodeSectionProps) {
  const control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={onValueChange} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={onValueChange} iconOnly aria-label={`load a ${kind} file`} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={value} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={() => onValueChange("")} iconOnly aria-label={`clear ${kind}`} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageSectionWithControl title={title} control={control}>
      <Textarea value={value} onChange={e => onValueChange(e.currentTarget.value)} rows={10} />
    </PageSectionWithControl>
  );
}
