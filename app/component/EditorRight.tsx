"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  code: string;
};

export default function EditorRight({ code }: Props) {
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      value={code}
      options={{ readOnly: true }}
    />
  );
}
