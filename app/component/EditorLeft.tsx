"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { editor } from "monaco-editor";
import type * as monaco from "monaco-editor";
import { detectLanguage } from "../lib/detectLanguage";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  code: string;
  setCode: (code: string) => void;
  setLanguage: (lang: string) => void;
};

export default function EditorLeft({ code, setCode, setLanguage }: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);

  function handleMount(
    editorInstance: editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco,
  ) {
    editorRef.current = editorInstance;
    monacoRef.current = monacoInstance;
  }

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={code}
      onMount={handleMount}
      onChange={(v) => {
        const value = v || "";
        setCode(value);

        const detected = detectLanguage(value);
        setLanguage(detected);

        const model = editorRef.current?.getModel();
        if (model && monacoRef.current) {
          monacoRef.current.editor.setModelLanguage(model, detected);
        }
      }}
    />
  );
}
