import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));

    try {
      await API.post("/users/register", data);
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-[350px] shadow">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input placeholder="Name" className="border p-2 rounded"
            onChange={e => setForm({ ...form, name: e.target.value })} />

          <input placeholder="Email" className="border p-2 rounded"
            onChange={e => setForm({ ...form, email: e.target.value })} />

          <input type="password" placeholder="Password"
            className="border p-2 rounded"
            onChange={e => setForm({ ...form, password: e.target.value })} />

          <input type="file"
            onChange={e => setForm({ ...form, avatar: e.target.files[0] })} />

          <button className="bg-indigo-600 text-white py-2 rounded">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;