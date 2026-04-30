import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <header className="flex justify-between px-6 py-4 border-b bg-white dark:bg-slate-900">
      <h2 className="text-indigo-600 font-bold">School Expertise</h2>

      <button
        onClick={() => setDark(!dark)}
        className="bg-indigo-600 text-white px-3 py-1 rounded"
      >
        {dark ? "Light" : "Dark"}
      </button>
    </header>
  );
};