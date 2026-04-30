import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/login", form);
      await fetchUser();
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-[350px] shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Email"
            className="border p-2 rounded"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button className="bg-indigo-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;