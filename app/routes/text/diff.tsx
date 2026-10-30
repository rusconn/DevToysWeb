import { Panel, PanelGroup } from "react-resizable-panels";

import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { DiffEditor } from "../../components/diff-editor";
import { Editor } from "../../components/editor";
import { LabeledSwitch } from "../../components/labeled-switch";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import * as icons from "../../components/primitives/icons";

import { indexMeta } from "../../utils/meta";
import {
  HORIZONTAL_PANEL_MAX_SIZE,
  PERSISTENCE_KEY,
  VERTICAL_PANEL_MAX_SIZE,
} from "./+diff/config";
import { PanelResizeHandle } from "./+diff/panel-resize-handle";
import { ToggleFullSize } from "./+diff/toggle-full-size";
import { usePage } from "./+diff/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.text.tools.diff);
};

export default function Diff() {
  const {
    input1,
    setInput1,
    input2,
    setInput2,
    diffFullHeight,
    inlineMode,
    setInlineMode,
    diffPanelMaxSize,
    toggleFullHeight,
  } = usePage();

  const inlineModeConfig = (
    <ConfigurationItem
      icon={<icons.Rows size={24} />}
      title="Inline mode"
      control={
        <LabeledSwitch
          id="inline-mode-switch"
          label={inlineMode ? "On" : "Off"}
          checked={inlineMode}
          onCheckedChange={setInlineMode}
          aria-label="toggle whether to show diff in inline mode"
        />
      }
    />
  );

  const diffControl = (
    <ControlMenu>
      <ControlMenuItem>
        <ToggleFullSize iconOnly onClick={toggleFullHeight} expanded={diffFullHeight} />
      </ControlMenuItem>
    </ControlMenu>
  );

  const hiddenInFullHeightMode = diffFullHeight ? "hidden" : "";

  return (
    <PageRootSection className="h-full" title={toolGroups.text.tools.diff.longTitle}>
      <PageSection title="Configuration" className={hiddenInFullHeightMode}>
        <Configuration>{inlineModeConfig}</Configuration>
      </PageSection>

      <PanelGroup direction="vertical" autoSaveId={PERSISTENCE_KEY.panels.vertical}>
        <Panel maxSize={VERTICAL_PANEL_MAX_SIZE} className={hiddenInFullHeightMode}>
          <PanelGroup direction="horizontal" autoSaveId={PERSISTENCE_KEY.panels.horizontal}>
            <EditorSectionPanel
              title="Old text"
              kind="old"
              value={input1}
              onValueChange={setInput1}
            />

            <div className="mt-10.5">
              <PanelResizeHandle direction="vertical" />
            </div>

            <EditorSectionPanel
              title="New text"
              kind="new"
              value={input2}
              onValueChange={setInput2}
            />
          </PanelGroup>
        </Panel>

        <PanelResizeHandle
          direction="horizontal"
          {...(hiddenInFullHeightMode && { hidden: true })}
        />

        <Panel maxSize={diffPanelMaxSize}>
          <PageSectionWithControl className="h-full" title="Difference" control={diffControl}>
            <DiffEditor
              original={input1}
              modified={input2}
              options={{
                readOnly: true,
                renderSideBySide: !inlineMode,
              }}
            />
          </PageSectionWithControl>
        </Panel>
      </PanelGroup>
    </PageRootSection>
  );
}

type EditorSectionPanelProps = {
  title: string;
  kind: string;
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
};

function EditorSectionPanel({ title, kind, value, onValueChange }: EditorSectionPanelProps) {
  const control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={onValueChange} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File
          onFileRead={onValueChange}
          iconOnly
          aria-label={`load a file with ${kind} text`}
        />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear
          onClick={() => onValueChange("")}
          iconOnly
          aria-label={`clear ${kind} text input`}
        />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <Panel maxSize={HORIZONTAL_PANEL_MAX_SIZE}>
      <PageSectionWithControl className="h-full" title={title} control={control}>
        <Editor value={value} onChange={onValueChange} />
      </PageSectionWithControl>
    </Panel>
  );
}
