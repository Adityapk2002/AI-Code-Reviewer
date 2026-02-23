"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { editor } from "monaco-editor";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  code: string;
  setCode: (code: string) => void;
  setLanguage: (lang: string) => void;
};

export default function EditorLeft({ code, setCode, setLanguage }: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleMount(editorInstance: editor.IStandaloneCodeEditor) {
    editorRef.current = editorInstance;

    const lang = editorInstance.getModel()?.getLanguageId();
    if (lang) setLanguage(lang);

    editorInstance.onDidChangeModelLanguage(
      (e: editor.IModelLanguageChangedEvent) => {
        setLanguage(e.newLanguage);
      },
    );
  }

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{
        wordWrap: "on",
        wrappingStrategy: "advanced",
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        fontSize: 14,
        lineHeight: 22,
        padding: { top: 20 },
      }}
      value={code}
      onMount={handleMount}
      onChange={(v) => setCode(v || "")}
    />
  );
}
