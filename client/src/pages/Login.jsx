import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Eye, EyeOff, GraduationCap, Sun, Moon, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const { dark, toggleTheme } = useTheme();

  if (user) {
    if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" />;
    if (user.role === "TEACHER") return <Navigate to="/teacher/dashboard" />;
    return <Navigate to="/" />;
  }

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/users/login", form);
      const meRes = await API.get("/users/me");
      const loggedUser = meRes.data.data;
      login(loggedUser);
      toast.success("Login successful!");
      if (loggedUser.role === "ADMIN") navigate("/admin/dashboard");
      else if (loggedUser.role === "TEACHER") navigate("/teacher/dashboard");
      else navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] transition-colors">

      {/* TOP BAR */}
      <div
        className="flex items-center justify-between w-full"
        style={{ padding: '20px 48px' }}
      >
        <Link to="/" className="flex items-center" style={{ gap: '10px' }}>
          <div
            className="rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md"
            style={{ width: '36px', height: '36px' }}
          >
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">School Expertise</span>
        </Link>

        <div className="flex items-center" style={{ gap: '12px' }}>
          <button
            onClick={toggleTheme}
            className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            style={{ padding: '8px' }}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-500" />}
          </button>
          <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">Don't have an account?</span>
          <Link
            to="/signup"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            style={{ padding: '8px 16px' }}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* MAIN */}
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 80px)', padding: '40px 24px' }}
      >
        <div className="w-full animate-scale-in" style={{ maxWidth: '480px' }}>
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
          >
            {/* BANNER */}
            <div
              className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 text-white text-center relative overflow-hidden"
              style={{ padding: '48px 40px' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="relative">
                <div
                  className="mx-auto rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center"
                  style={{ width: '56px', height: '56px', marginBottom: '16px' }}
                >
                  <GraduationCap size={26} />
                </div>
                <h1 className="text-2xl font-bold" style={{ marginBottom: '6px' }}>Welcome Back</h1>
                <p className="text-sm text-indigo-100">Enter your credentials to continue.</p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ padding: '40px' }}>

              {/* Email field */}
              <div style={{ marginBottom: '24px' }}>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative" style={{ marginTop: '10px' }}>
                  <Mail size={16} className="absolute text-slate-400" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    required
                    placeholder="name@school.edu"
                    className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
                    style={{ paddingTop: '14px', paddingBottom: '14px', paddingLeft: '42px', paddingRight: '16px' }}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password field */}
              <div style={{ marginBottom: '32px' }}>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative" style={{ marginTop: '10px' }}>
                  <Lock size={16} className="absolute text-slate-400" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
                    style={{ paddingTop: '14px', paddingBottom: '14px', paddingLeft: '42px', paddingRight: '44px' }}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    style={{ right: '14px', top: '50%', transform: 'translateY(-50%)' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ padding: '16px', fontSize: '15px', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </span>
                ) : (<>Login <ArrowRight size={16} /></>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;