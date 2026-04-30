import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-800 shadow">
      <h2 className="text-indigo-600 font-bold text-xl">
        School Expertise
      </h2>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>

        <button
          onClick={() => setDark(!dark)}
          className="bg-indigo-600 text-white px-3 py-1 rounded"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;