import { useInfiniteQuery } from "@tanstack/react-query";
import type { UsersQueryParams } from "../../../types/api.ts";
import { apiInstance } from "../../../services/axios.ts";

const KEY = "users";

export function getInfiniteUsersQueryKey(params?: UsersQueryParams) {
  return [KEY, params].filter(Boolean);
}

export function useInfiniteUsersQuery(
  data?: UsersQueryParams & { enabled?: boolean },
) {
  const { enabled, ...params } = data || {};

  return useInfiniteQuery({
    queryKey: getInfiniteUsersQueryKey(params),
    queryFn: async ({ pageParam = 1 }) => {
      const parameters: UsersQueryParams = {
        ...params,
        page: pageParam,
      };
      const res = await apiInstance.get("/users", { params: parameters });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage;
      const loaded = page * limit;
      if (loaded >= total) {
        return undefined;
      }
      return page + 1;
    },
    enabled,
    initialPageParam: 1,
  });
}
