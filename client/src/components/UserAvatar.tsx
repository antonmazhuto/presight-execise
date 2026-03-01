import { useState } from "react";
import type { User } from "../types/api";

export const UserAvatar = ({ user }: { user: User }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const initials =
    `${user.first_name[0] ?? ""}${user.last_name[0] ?? ""}`.toUpperCase();

  if (isError) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative h-12 w-12">
      {!isLoaded && (
        <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
      )}

      <img
        className={`h-12 w-12 rounded-full object-cover transition-opacity ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  );
};
