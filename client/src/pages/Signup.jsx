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
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("avatar", form.avatar);

    try {
      await API.post("/users/register", data);
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <input type="file" onChange={e => setForm({ ...form, avatar: e.target.files[0] })} />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;