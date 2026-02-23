"use client";

import dynamic from "next/dynamic";

const DiffEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.DiffEditor),
  { ssr: false },
);

export default function DiffViewer({
  original,
  modified,
  language,
}: {
  original: string;
  modified: string;
  language: string;
}) {
  return (
    <DiffEditor
      height="100%"
      original={original}
      modified={modified}
      language={language}
      theme="vs-dark"
      options={{
        readOnly: true,
        minimap: { enabled: false },
        renderSideBySide: true,
        wordWrap: "on",
      }}
    />
  );
}
