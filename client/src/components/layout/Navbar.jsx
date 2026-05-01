import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/api";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await API.post("/users/logout");
  } catch (err) {
    console.error(err);
  } finally {
    logout(); // always clear frontend
    navigate("/login");
  }
};

  // ✅ FIXED: match backend roles (UPPERCASE)
  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";

  return (
    <header className="w-full border-b bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-600"></div>
          <span className="text-lg font-semibold text-indigo-600">
            School Expertise
          </span>
        </Link>

        {/* CENTER: NAV LINKS */}
        <div className="flex items-center gap-6">

          <Link
            to="/courses"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            Courses
          </Link>

          {/* ✅ ADMIN DASHBOARD */}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition font-medium"
            >
              Admin Dashboard
            </Link>
          )}

          {/* ✅ TEACHER DASHBOARD */}
          {isTeacher && (
            <Link
              to="/teacher"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition font-medium"
            >
              Teacher Dashboard
            </Link>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* THEME TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="text-gray-600 dark:text-gray-300 text-lg hover:text-indigo-600 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* AUTH */}
          {!user ? (
            <Link to="/login">
              <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition">
                Login
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">

              {/* USER NAME */}
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                {user.name}
              </span>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="border px-4 py-1.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;