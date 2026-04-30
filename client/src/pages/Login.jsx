import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/users/login", form);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;