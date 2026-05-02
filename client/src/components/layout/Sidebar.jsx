import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, UserCheck, Users, GraduationCap } from "lucide-react";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/courses", label: "Subjects", icon: BookOpen },
  { to: "/admin/teachers", label: "Faculty", icon: Users },
  { to: "/admin/teacher-requests", label: "Requests", icon: UserCheck },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300"
      style={{ width: '260px', minHeight: '100vh', flexShrink: 0 }}
    >
      {}
      <div
        className="border-b border-slate-100 dark:border-slate-800"
        style={{ padding: '24px 24px 20px' }}
      >
        <Link to="/admin/dashboard" className="flex items-center" style={{ gap: '12px' }}>
          <div
            className="rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg"
            style={{ width: '40px', height: '40px', flexShrink: 0, boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}
          >
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Admin Portal</h2>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium uppercase tracking-wider" style={{ fontSize: '10px', marginTop: '2px' }}>
              Expertise Management
            </p>
          </div>
        </Link>
      </div>

      {}
      <nav className="flex-1" style={{ padding: '16px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center text-sm font-medium transition-all duration-200 group rounded-xl border ${
                isActive(to)
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white border-transparent"
              }`}
              style={{ padding: '11px 14px', gap: '12px' }}
            >
              <Icon
                size={18}
                className={`transition-all duration-200 group-hover:scale-110 ${isActive(to) ? "text-indigo-600 dark:text-indigo-400" : ""}`}
              />
              {label}
              {isActive(to) && (
                <div className="ml-auto rounded-full bg-indigo-500 animate-pulse" style={{ width: '8px', height: '8px' }} />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {}
      <div className="border-t border-slate-100 dark:border-slate-800" style={{ padding: '16px 12px' }}>
        <Link
          to="/"
          className="flex items-center text-sm text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
          style={{ padding: '10px 14px', gap: '8px' }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;