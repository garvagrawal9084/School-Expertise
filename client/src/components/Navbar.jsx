import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../api/api";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await API.post("/users/logout");
    setUser(null);
  };

  return (
    <div className="card" style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>School Expertise</h3>

      <div>
        <Link to="/">Home</Link>{" "}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}

        {user && (
          <>
            <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;