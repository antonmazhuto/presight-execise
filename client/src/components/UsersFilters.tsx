import type { FC } from "react";

type UsersFiltersProps = {
  search: string;
  selectedNationality: string;
  selectedHobby: string;
  nationalities: string[];
  hobbies: string[];
  onSearchChange: (value: string) => void;
  onNationalityChange: (value: string) => void;
  onHobbyChange: (value: string) => void;
};

export const UsersFilters: FC<UsersFiltersProps> = ({
  search,
  selectedNationality,
  selectedHobby,
  nationalities,
  hobbies,
  onSearchChange,
  onNationalityChange,
  onHobbyChange,
}) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <input
        type="text"
        className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        placeholder="Search by name or hobby"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="w-full max-w-[200px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        value={selectedNationality}
        onChange={(e) => onNationalityChange(e.target.value)}
      >
        <option className="text-slate-700" value="">
          All nationalities
        </option>
        {nationalities.map((n) => (
          <option className="text-slate-700" key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <select
        className="w-full max-w-[200px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        value={selectedHobby}
        onChange={(e) => onHobbyChange(e.target.value)}
      >
        <option className="text-slate-700" value="">
          All hobbies
        </option>
        {hobbies.map((h) => (
          <option className="text-slate-700" key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
    </div>
  );
};
