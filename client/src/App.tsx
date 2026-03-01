import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { UsersPage } from "./pages/UsersPage.tsx";
import { StreamPage } from "./pages/StreamPage.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { JobsPage } from "./pages/JobsPage.tsx";

function App() {
  return (
    <div className="min-h-screen text-slate-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/text-stream" element={<StreamPage />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
