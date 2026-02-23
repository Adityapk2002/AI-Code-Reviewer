"use client";

type Props = {
  code: string;
  language: string;
  setOutput: (output: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setDiff: (d: string) => void;
};

export default function Controls({
  code,
  language,
  setOutput,
  loading,
  setLoading,
  setDiff,
}: Props) {
  const callAI = async (mode: string) => {
    if (!code) {
      alert("Paste code");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🔥 important
        },
        body: JSON.stringify({ code, language, mode }),
      });

      const data = await res.json();
      setOutput(data.result);
      setDiff(data.diff);
    } catch (err) {
      console.error(err);
      alert("AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-16 border-t border-zinc-800 flex gap-3 items-center px-6">
      <button
        disabled={loading}
        onClick={() => callAI("check")}
        className="btn"
      >
        Fix Errors
      </button>

      <button
        disabled={loading}
        onClick={() => callAI("improve")}
        className="btn"
      >
        Improve
      </button>

      <button
        disabled={loading}
        onClick={() => callAI("optimize")}
        className="btn"
      >
        Optimize
      </button>

      <button
        disabled={loading}
        onClick={() => callAI("explain")}
        className="btn"
      >
        Explain
      </button>
    </div>
  );
}
