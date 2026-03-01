import type { User } from "../types/api.ts";
import { UserAvatar } from "./UserAvatar.tsx";

export const UserCard = ({ user }: { user: User }) => {
  const topHobbies = user.hobbies.slice(0, 2);
  const restCount = Math.max(0, user.hobbies.length - 2);

  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <UserAvatar user={user} />

      <div className="flex flex-1 flex-col gap-1">
        <div className="text-sm font-semibold text-slate-900">
          {user.first_name} {user.last_name}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{user.nationality}</span>
          <span>{user.age} yrs</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          {topHobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
            >
              {hobby}
            </span>
          ))}
          {restCount > 0 && (
            <span className="text-[11px] text-slate-500">
              +{restCount} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
