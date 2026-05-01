import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <header className="w-full border-b bg-white dark:bg-[#0f172a]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[--color-primary]"></div>
          <span className="text-lg font-semibold text-[--color-primary]">
            School Expertise
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Search icon */}
          <button className="text-gray-500 hover:text-black">
            🔍
          </button>

          {/* Menu */}
          <button className="text-gray-500 hover:text-black">
            ☰
          </button>

          {/* Login */}
          <Link to="/login">
            <button className="bg-[--color-primary] text-white px-4 py-1.5 rounded-lg">
              Login
            </button>
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="text-lg"
          >
            {dark ? "☀️" : "🌙"}
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;