"use client";

import { ComponentPropsWithRef } from "react";
import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";

import { useTheme } from "@/_contexts/theme";

export type EditorProps = ComponentPropsWithRef<typeof MonacoDiffEditor>;

export const DiffEditor = ({ options, theme, ...props }: EditorProps) => {
  const { theme: appTheme } = useTheme();
  const themeToUse = theme ?? (appTheme === "light" ? "light" : "vs-dark");

  return (
    <MonacoDiffEditor
      theme={themeToUse}
      options={{
        tabFocusMode: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        ...options, // NOTE: merge shallowly
      }}
      {...props}
    />
  );
};
