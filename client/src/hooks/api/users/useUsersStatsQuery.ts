import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "../../../services/axios.ts";

type UsersStatsResponse = {
  nationalities: string[];
  hobbies: string[];
  nationalityStats: { nationality: string; count: number }[];
  hobbyStats: { hobby: string; count: number }[];
};

export const useUsersStatsQuery = () =>
  useQuery<UsersStatsResponse, Error>({
    queryKey: ["users", "stats"],
    queryFn: async () => {
      const res = await apiInstance.get<UsersStatsResponse>("/users/stats");
      return res.data;
    },
  });
