"use client";
import { useState } from "react";
import EditorLeft from "./component/EditorLeft";
import EditorRight from "./component/EditorRight";
import Controls from "./component/Controls";
import DiffViewer from "./component/DiffViwer";

export default function Home() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [diffCode, setDiffCode] = useState("");
  const [viewMode, setViewMode] = useState<"code" | "diff">("code");

  return (
    <main className="h-screen bg-zinc-950 text-white flex flex-col">
      {/* topbar */}
      <div className="h-14 border-b border-zinc-800 flex items-center px-6">
        <h1 className="font-bold text-lg">AI Code Improver</h1>
      </div>

      {/* editors */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT EDITOR */}
        <div className="w-1/2 border-r border-zinc-800">
          <EditorLeft code={code} setCode={setCode} setLanguage={setLanguage} />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex flex-col">
          <div className="flex gap-3 px-4 py-2 border-b border-zinc-800">
            <button className="btn" onClick={() => setViewMode("code")}>
              Code
            </button>

            <button className="btn" onClick={() => setViewMode("diff")}>
              Diff View
            </button>
          </div>

          {/* RIGHT EDITOR AREA */}
          <div className="flex-1">
            {viewMode === "code" ? (
              <EditorRight code={output} language={language} />
            ) : (
              <DiffViewer
                original={code}
                modified={output}
                language={language}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Controls
          code={code}
          language={language}
          setOutput={setOutput}
          setDiff={setDiffCode}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </main>
  );
}
