import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const linkBase =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors";
  const inactive = "text-slate-300 hover:text-white hover:bg-slate-800/80";
  const active = "bg-white text-slate-900";

  const isUsers = location.pathname.startsWith("/users");
  const isStream = location.pathname.startsWith("/text-stream");
  const isJobs = location.pathname.startsWith("/jobs");

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      {" "}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold text-slate-100">
          Presight frontend exercise
        </span>
        <nav className="flex gap-2">
          <Link
            to="/users"
            className={`${linkBase} ${isUsers ? active : inactive}`}
          >
            Users
          </Link>
          <Link
            to="/text-stream"
            className={`${linkBase} ${isStream ? active : inactive}`}
          >
            Text stream
          </Link>
          <Link
            to="/jobs"
            className={`${linkBase} ${isJobs ? active : inactive}`}
          >
            Jobs
          </Link>
        </nav>
      </div>
    </header>
  );
};
