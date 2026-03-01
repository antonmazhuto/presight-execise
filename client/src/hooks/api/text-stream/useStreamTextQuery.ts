import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const STREAM_QUERY_KEY = ["stream", "text"];

export const useStreamTextQuery = () => {
  const [text, setText] = useState("");

  const mutation = useMutation({
    mutationKey: STREAM_QUERY_KEY,
    mutationFn: async () => {
      setText("");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000"}/stream`,
      );
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      if (!res.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setText((prev) => prev + chunk);
      }

      return text;
    },
  });

  return {
    text,
    isStreaming: mutation.isPending,
    error: mutation.error as Error | null,
    start: () => mutation.mutate(),
    reset: () => {
      setText("");
      mutation.reset();
    },
  };
};
