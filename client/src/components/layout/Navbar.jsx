import { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, LogOut, Menu, X, GraduationCap, ChevronDown } from "lucide-react";

const Navbar = ({ isAdmin }) => {
  const { user, logout } = useContext(AuthContext);
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => { await logout(); navigate("/login"); };
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: "Home", path: "/", show: true },
    { label: "Courses", path: "/courses", show: true },
    { label: "Teachers", path: "/teachers", show: true },
    { label: "Admin", path: "/admin/dashboard", show: user?.role === "ADMIN" },
    { label: "Dashboard", path: "/teacher/dashboard", show: user?.role === "TEACHER" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm">
      <div className="w-full" style={isAdmin ? { paddingLeft: '24px', paddingRight: '32px' } : { paddingLeft: '48px', paddingRight: '48px' }}>
        <div className={`flex items-center h-20 ${isAdmin ? 'justify-end' : 'justify-between'}`}>
          
          {}
          {!isAdmin && (
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 whitespace-nowrap">
                School Expertise
              </span>
            </Link>
          )}

          {}
          {!isAdmin && (
            <div className="hidden md:flex items-center gap-8 mx-auto">
              {navLinks.filter(l => l.show).map((link) => (
                <Link key={link.path} to={link.path}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive(link.path)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {}
          <div className="flex items-center gap-4 ml-auto">
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0" aria-label="Toggle theme">
              {dark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>

            {!user ? (
              <div className="flex items-center gap-3 shrink-0">
                <Link to="/login" className="hidden sm:inline-flex text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all whitespace-nowrap shrink-0" style={{ padding: '10px 16px' }}>
                  Login
                </Link>
                <Link to="/signup" className="inline-flex items-center justify-center bg-indigo-600 text-white rounded-full font-semibold text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all whitespace-nowrap shrink-0" style={{ padding: '10px 24px' }}>
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative shrink-0">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&size=40`} alt="avatar" className="w-9 h-9 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700" />
                  <span className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-200 mr-1">{user.name}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 z-50 animate-slide-up origin-top-right"
                    style={{ top: 'calc(100% + 8px)', width: '220px', padding: '8px 0', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)' }}
                  >
                    <div className="border-b border-slate-100 dark:border-slate-700" style={{ padding: '8px 20px 12px', marginBottom: '8px' }}>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {user.name} <span className="font-normal text-slate-500 dark:text-slate-400">({user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "User"})</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate" style={{ marginTop: '2px' }}>{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { setProfileOpen(false); handleLogout(); }}
                      className="flex items-center w-full text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium text-left"
                      style={{ padding: '10px 20px', gap: '10px' }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;