import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useCreateJobMutation } from "../hooks/api/jobs/useJobsMutation.ts";

type JobItem = {
  id: string;
  status: "pending" | "completed";
  result?: string;
};

export const JobsPage = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const createJobMutation = useCreateJobMutation();

  useEffect(() => {
    let cancelled = false;

    const createJobs = async () => {
      const items: JobItem[] = [];
      for (let i = 0; i < 20; i++) {
        const job = await createJobMutation.mutateAsync();
        if (cancelled) return;
        items.push({ id: job.id, status: job.status });
      }
      setJobs(items);
    };

    createJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const socket: Socket = io(
      `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000"}`,
    );

    socket.on(
      "job_result",
      (payload: { id: string; status: string; result: string }) => {
        setJobs((prev) =>
          prev.map((job) => {
            if (job.id === payload.id) {
              return {
                ...job,
                status: payload.status as JobItem["status"],
                result: payload.result,
              };
            } else {
              return job;
            }
          }),
        );
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="mb-4 text-xl font-semibold">Jobs queue</h1>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  #{index + 1} • {job.id.slice(0, 8)}
                </span>
                <span
                  className={
                    job.status === "completed"
                      ? "rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300"
                      : "rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300"
                  }
                >
                  {job.status}
                </span>
              </div>
              {job.result && (
                <div className="mt-2 text-xs text-slate-200">{job.result}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
