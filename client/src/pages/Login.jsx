import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/users/login", form);

      navigate("/"); // redirect after login

    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8fafc] dark:bg-[#0f172a]">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 h-16 border-b bg-white dark:bg-[#1e293b]">
        <span className="text-indigo-600 font-semibold text-lg">
          School Expertise
        </span>

        <Link to="/signup">
          <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg">
            Signup
          </button>
        </Link>
      </div>

      {/* MAIN */}
      <div className="flex flex-col items-center justify-center flex-1 px-4">

        {/* ICON */}
        <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 text-xl">
          🎓
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-gray-500 text-center mt-2 max-w-xs">
          Enter your credentials to access the system.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1e293b] w-full max-w-sm mt-6 p-6 rounded-xl shadow"
        >

          {/* EMAIL */}
          <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
          <input
            type="email"
            required
            placeholder="name@school.edu"
            className="w-full border rounded-lg p-2 mt-1 mb-4 bg-transparent"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <label className="text-xs text-gray-500">PASSWORD</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full border rounded-lg p-2 mt-1 mb-4 bg-transparent"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* LINK */}
        <p className="text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Signup
          </Link>
        </p>

      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 pb-4">
        © 2024 School Expertise System. All rights reserved.
      </div>

    </div>
  );
};

export default Login;