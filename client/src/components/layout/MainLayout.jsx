import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <Outlet />   {/* ✅ THIS FIXES EVERYTHING */}
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        © 2026 School Expertise System
      </footer>

    </div>
  );
};

export default MainLayout;