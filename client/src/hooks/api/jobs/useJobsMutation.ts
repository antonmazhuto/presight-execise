import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "../../../services/axios.ts";

export type JobDto = {
  id: string;
  status: "pending" | "completed";
};

export const useCreateJobMutation = () =>
  useMutation<JobDto>({
    mutationKey: ["jobs", "create"],
    mutationFn: async () => {
      const res = await apiInstance.post<JobDto>("/jobs");
      return res.data;
    },
  });
