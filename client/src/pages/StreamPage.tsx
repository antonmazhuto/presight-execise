import { useStreamTextQuery } from "../hooks/api/text-stream/useStreamTextQuery.ts";

export const StreamPage = () => {
  const { text, isStreaming, error, start, reset } = useStreamTextQuery();

  return (
    <div className="min-h-screen text-slate-50">
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-xl font-semibold">Streaming text</h1>

        <div className="flex gap-2">
          <button
            onClick={start}
            disabled={isStreaming}
            className="rounded bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 disabled:opacity-40"
          >
            {isStreaming ? "Streaming..." : "Start streaming"}
          </button>
          <button
            onClick={reset}
            className="rounded border border-slate-500 px-3 py-2 text-xs text-slate-200"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="mt-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error.message}
          </div>
        )}

        <div className="mt-4 rounded-xl bg-slate-800/80 p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {text || (!isStreaming && "Click “Start streaming” to load text")}
        </div>
      </div>
    </div>
  );
};
