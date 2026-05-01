import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 Protected navigation (login required)
  const handleProtectedRoute = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">

      {/* 🔹 LOGO */}
      <h1
        className="text-lg font-bold cursor-pointer text-indigo-600"
        onClick={() => navigate("/")}
      >
        School Expertise
      </h1>

      {/* 🔹 NAV LINKS */}
      <div className="flex items-center gap-6">

        {/* Courses */}
        <button
          onClick={() => handleProtectedRoute("/courses")}
          className="text-gray-700 hover:text-indigo-600"
        >
          Courses
        </button>

        {/* Teachers */}
        <button
          onClick={() => handleProtectedRoute("/teachers")}
          className="text-gray-700 hover:text-indigo-600"
        >
          Teachers
        </button>

        {/* 🔥 Admin only */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Admin
          </button>
        )}

        {/* 🔥 Teacher only */}
        {user?.role === "teacher" && (
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Dashboard
          </button>
        )}

      </div>

      {/* 🔹 RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        ) : (
          <>
            <span className="text-sm text-gray-600">
              {user.name}
            </span>

            <button
              onClick={logout}
              className="border px-3 py-1 rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;