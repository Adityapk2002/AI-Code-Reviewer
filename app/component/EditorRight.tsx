"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  code: string;
  language: string;
};

export default function EditorRight({ code, language }: Props) {
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      language={language || "javascript"} // 🔥 important
      value={code}
      options={{
        readOnly: true,
        wordWrap: "on",
        wrappingStrategy: "advanced",
        minimap: { enabled: false },
        fontSize: 14,
        lineHeight: 22,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
