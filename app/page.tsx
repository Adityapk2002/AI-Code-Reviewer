"use client";
import { useState } from "react";
import EditorLeft from "./component/EditorLeft";
import EditorRight from "./component/EditorRight";
import Controls from "./component/Controls";

export default function Home() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);

  return (
    <main className="h-screen bg-zinc-950 text-white flex flex-col">
      {/* topbar */}
      <div className="h-14 border-b border-zinc-800 flex items-center px-6">
        <h1 className="font-bold text-lg">AI Code Improver</h1>
      </div>

      {/* editors */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-zinc-800">
          <EditorLeft code={code} setCode={setCode} setLanguage={setLanguage} />
        </div>

        <div className="w-1/2">
          <EditorRight code={output} language={language} />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Controls
          code={code}
          language={language}
          setOutput={setOutput}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </main>
  );
}
