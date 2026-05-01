import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r p-4">

        <h2 className="text-lg font-bold text-indigo-600 mb-6">
          Admin Portal
        </h2>

        <nav className="space-y-3">

          <Link
            to="/admin/dashboard"
            className={`block px-3 py-2 rounded ${
              location.pathname === "/admin/dashboard"
                ? "bg-indigo-100 text-indigo-600"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/courses"
            className={`block px-3 py-2 rounded ${
              location.pathname === "/admin/courses"
                ? "bg-indigo-100 text-indigo-600"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Courses
          </Link>

          <Link
            to="/admin/teacher-requests"
            className={`block px-3 py-2 rounded ${
              location.pathname === "/admin/teacher-requests"
                ? "bg-indigo-100 text-indigo-600"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Requests
          </Link>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
};

export default AdminLayout;