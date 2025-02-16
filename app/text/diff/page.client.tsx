"use client";

import { useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";

import { toolGroups } from "../../_config/tools";
import * as icons from "../../_components/primitives/icons";
import { Configuration, ConfigurationItem } from "../../_components/configuration";
import * as Button from "../../_components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../_components/control-menu";
import { DiffEditor } from "../../_components/diff-editor";
import { Editor } from "../../_components/editor";
import { LabeledSwitch } from "../../_components/labeled-switch";
import { PageRootSection } from "../../_components/page-root-section";
import { PageSection } from "../../_components/page-section";

import { PanelResizeHandle } from "./_components/panel-resize-handle";
import { ToggleFullSize } from "./_components/toggle-full-size";
import { PERSISTENCE_KEY } from "./config";

/** No particular reason for these sizes, just feels like a good balance */
const VERTICAL_PANEL_MAX_SIZE = 80;
const HORIZONTAL_PANEL_MAX_SIZE = 90;
const PANEL_FULL_SIZE = 100;

export default function ClientBoundary() {
  const [input1, setInput1] = useState<string | undefined>("Hello world");
  const [input2, setInput2] = useState<string | undefined>("Hello, World!");
  const [diffFullHeight, setDiffFullHeight] = useState(false);
  const [inlineMode, setInlineMode] = useState(false);
  const diffPanelMaxSize = diffFullHeight ? PANEL_FULL_SIZE : VERTICAL_PANEL_MAX_SIZE;

  const clearInput1 = () => setInput1("");
  const clearInput2 = () => setInput2("");
  const toggleFullHeight = () => setDiffFullHeight(prev => !prev);

  const inlineModeConfig = (
    <ConfigurationItem
      icon={<icons.Rows size={24} />}
      title="Inline mode"
      control={
        <LabeledSwitch
          id="uppercase-switch"
          label={inlineMode ? "On" : "Off"}
          checked={inlineMode}
          onCheckedChange={setInlineMode}
          aria-label="toggle whether to show diff in inline mode"
        />
      }
    />
  );
  const input1Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setInput1} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setInput1} iconOnly aria-label="load a file with old text" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearInput1} iconOnly aria-label="clear old text input" />
      </ControlMenuItem>
    </ControlMenu>
  );

  const input2Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setInput2} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setInput2} iconOnly aria-label="load a file with new text" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearInput2} iconOnly aria-label="clear new text input" />
      </ControlMenuItem>
    </ControlMenu>
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
            <Panel maxSize={HORIZONTAL_PANEL_MAX_SIZE}>
              <PageSection className="h-full" title="Old text" control={input1Control}>
                <Editor value={input1} onChange={setInput1} />
              </PageSection>
            </Panel>
            <div className="mt-[42px]">
              <PanelResizeHandle direction="vertical" />
            </div>

            <Panel maxSize={HORIZONTAL_PANEL_MAX_SIZE}>
              <PageSection className="h-full" title="New text" control={input2Control}>
                <Editor value={input2} onChange={setInput2} />
              </PageSection>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle
          direction="horizontal"
          {...(hiddenInFullHeightMode && { hidden: true })}
        />
        <Panel maxSize={diffPanelMaxSize}>
          <PageSection className="h-full" title="Difference" control={diffControl}>
            <DiffEditor
              original={input1}
              modified={input2}
              options={{
                readOnly: true,
                renderSideBySide: !inlineMode,
              }}
            />
          </PageSection>
        </Panel>
      </PanelGroup>
    </PageRootSection>
  );
}
