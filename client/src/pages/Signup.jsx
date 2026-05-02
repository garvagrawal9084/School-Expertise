import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { Upload, Sun, Moon, User, Mail, Lock, GraduationCap, ArrowRight } from "lucide-react";

const inputStyle = {
  paddingTop: '14px',
  paddingBottom: '14px',
  paddingLeft: '42px',
  paddingRight: '16px',
};

const inputClass = "w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm";

const Signup = () => {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: null, teacherRequest: false, message: "" });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("password", form.password);
      if (form.avatar) data.append("avatar", form.avatar);
      if (form.teacherRequest) { data.append("teacherRequest", "true"); data.append("message", form.message); }
      await API.post("/users/register", data);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] transition-colors">

      {}
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
          <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">Already have an account?</span>
          <Link
            to="/login"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            style={{ padding: '8px 16px' }}
          >
            Login
          </Link>
        </div>
      </div>

      {}
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 80px)', padding: '32px 24px' }}
      >
        <div className="w-full animate-scale-in" style={{ maxWidth: '500px' }}>
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
          >
            {}
            <div
              className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 text-white text-center relative overflow-hidden"
              style={{ padding: '44px 40px' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
              <div className="relative">
                <h2 className="text-2xl font-bold" style={{ marginBottom: '6px' }}>Join the Network</h2>
                <p className="text-sm text-indigo-100">Create your educator profile and map your expertise.</p>
              </div>
            </div>

            {}
            <form onSubmit={handleSubmit} style={{ padding: '40px' }}>

              {}
              <div style={{ marginBottom: '24px' }}>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                <div className="relative" style={{ marginTop: '10px' }}>
                  <User size={16} className="absolute text-slate-400" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text" required placeholder="Ashish Sharma"
                    className={inputClass} style={inputStyle}
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              {}
              <div style={{ marginBottom: '24px' }}>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                <div className="relative" style={{ marginTop: '10px' }}>
                  <Mail size={16} className="absolute text-slate-400" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email" required placeholder="educator@school.edu"
                    className={inputClass} style={inputStyle}
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              {}
              <div style={{ marginBottom: '24px' }}>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
                <div className="relative" style={{ marginTop: '10px' }}>
                  <Lock size={16} className="absolute text-slate-400" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password" required placeholder="••••••••"
                    className={inputClass} style={inputStyle}
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
                <p className="text-xs text-slate-400 text-right" style={{ marginTop: '6px' }}>Must be at least 6 characters</p>
              </div>

              {}
              <div style={{ marginBottom: '24px' }}>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upload Avatar</label>
                <div
                  className="border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 rounded-xl text-center hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-200 bg-indigo-50/30 dark:bg-indigo-900/10"
                  style={{ padding: '24px', marginTop: '10px' }}
                >
                  <input
                    type="file" accept="image/*"
                    onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div

                className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
                style={{ gap: '12px', padding: '14px 16px', marginBottom: '24px' }}
              >
                <input
                  type="checkbox" id="teacherRequest"
                  checked={form.teacherRequest}
                  onChange={(e) => setForm({ ...form, teacherRequest: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <label htmlFor="teacherRequest" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                  Register as Teacher
                </label>
              </div>

              {form.teacherRequest && (
                <div className="animate-slide-down" style={{ marginBottom: '24px' }}>
                  <textarea
                    placeholder="Write a message for admin about your expertise..."
                    rows={3}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm resize-none"
                    style={{ padding: '14px 16px' }}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              )}

              {}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ padding: '16px', fontSize: '15px', boxShadow: '0 8px 24px rgba(99,102,241,0.35)', marginBottom: '16px' }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (<>Signup <ArrowRight size={16} /></>)}
              </button>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                By signing up, you agree to the{' '}
                <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;