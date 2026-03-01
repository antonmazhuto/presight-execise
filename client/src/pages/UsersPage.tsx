import { useEffect, useMemo, useRef, useState } from "react";
import { UserCard } from "../components/UserCard.tsx";
import { UsersFilters } from "../components/UsersFilters.tsx";
import { useDebouncedValue } from "../hooks/common/useDebouncedValue.ts";
import { useInfiniteUsersQuery } from "../hooks/api/users/useInfiniteUsersQuery.ts";
import { useUsersStatsQuery } from "../hooks/api/users/useUsersStatsQuery.ts";

export const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedHobby, setSelectedHobby] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteUsersQuery({
    search: debouncedSearch,
    nationality: selectedNationality,
    hobby: selectedHobby,
    limit: 20,
  });

  const { data: stats } = useUsersStatsQuery();

  const nationalities = stats?.nationalities ?? [];
  const hobbies = stats?.hobbies ?? [];

  const nationalityStats = stats?.nationalityStats ?? [];
  const hobbyStats = stats?.hobbyStats ?? [];

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const users = useMemo(
    () => data?.pages.flatMap((page) => page.items) || [],
    [data?.pages],
  );

  return (
    <div className="min-h-screen overflow-y-scroll [scrollbar-gutter:stable]">
      <div className="mx-auto max-w-6xl p-4">
        <UsersFilters
          search={search}
          selectedNationality={selectedNationality}
          selectedHobby={selectedHobby}
          nationalities={nationalities}
          hobbies={hobbies}
          onSearchChange={setSearch}
          onNationalityChange={setSelectedNationality}
          onHobbyChange={setSelectedHobby}
        />

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            {error && (
              <div className="mb-4 flex items-center justify-between rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <span>Failed to load users</span>
                <button
                  onClick={() => fetchNextPage()}
                  className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white"
                >
                  Retry
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-xl border border-slate-200 bg-slate-100 animate-pulse"
                  />
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="text-sm text-slate-500">
                No users match current filters
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
                <div
                  ref={loaderRef}
                  className="mt-4 flex items-center justify-center text-xs text-slate-500"
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                      ? "Scroll to load more"
                      : "No more users"}
                </div>
              </>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="rounded-xl bg-slate-900/40 p-3 text-sm text-slate-50">
              <h3 className="mb-2 text-xs font-semibold uppercase text-slate-400">
                Top nationalities
              </h3>
              <ul className="space-y-1">
                {nationalityStats.map(({ nationality, count }) => (
                  <li
                    key={nationality}
                    className="flex cursor-pointer items-center justify-between rounded px-2 py-1 hover:bg-slate-800"
                    onClick={() => setSelectedNationality(nationality)}
                  >
                    <span>{nationality}</span>
                    <span className="text-xs text-slate-400">{count}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-4 mb-2 text-xs font-semibold uppercase text-slate-400">
                Top hobbies
              </h3>
              <ul className="max-h-64 space-y-1 overflow-y-auto">
                {hobbyStats.map(({ hobby, count }) => (
                  <li
                    key={hobby}
                    className="flex cursor-pointer items-center justify-between rounded px-2 py-1 hover:bg-slate-800"
                    onClick={() => setSelectedHobby(hobby)}
                  >
                    <span>{hobby}</span>
                    <span className="text-xs text-slate-400">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
