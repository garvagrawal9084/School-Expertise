import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/users/login", form);

      login(res.data.data); // store user in context + localStorage

      toast.success("Login successful");

      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-sm bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow">

        {/* ICON */}
        <div className="w-14 h-14 mx-auto rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 text-xl">
          🎓
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <p className="text-gray-500 text-center mt-2">
          Enter your credentials to access the system.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6">

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

        {/* SIGNUP LINK */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;