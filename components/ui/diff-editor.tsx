"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";
import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";
import { useTheme } from "next-themes";

export type EditorProps = ComponentPropsWithoutRef<typeof MonacoDiffEditor>;

export const DiffEditor = forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ options, theme, ...props }, ref) => {
    const { theme: appTheme } = useTheme();
    const themeToUse = theme ?? (appTheme === "light" ? "light" : "vs-dark");

    return (
      <MonacoDiffEditor
        {...{ ref }}
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
  }
);

DiffEditor.displayName = "Editor";
