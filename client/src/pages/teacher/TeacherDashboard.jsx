import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import toast from "react-hot-toast";
import { Camera, Save, BookOpen, Briefcase, Award } from "lucide-react";

const inputStyle = {
  width: '100%',
  marginTop: '10px',
  padding: '13px 16px',
  border: '2px solid #e2e8f0',
  borderRadius: '12px',
  background: 'transparent',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s',
  boxSizing: 'border-box',
};

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ bio: "", experience: "", specialization: "", role: "Lecturer" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/teacher/me");
      const d = res.data.data;
      setProfile(d);
      setForm({ bio: d.bio || "", experience: d.experience || "", specialization: d.specialization?.join(", ") || "", role: d.role || "Lecturer" });
    } catch { toast.error("Failed to load profile"); }
  };

  const fetchCourses = async () => {
    try { const res = await API.get("/teacher/me/courses"); setCourses(res.data.data || []); }
    catch { toast.error("Failed to load courses"); }
  };

  useEffect(() => { Promise.all([fetchProfile(), fetchCourses()]).finally(() => setLoading(false)); }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await API.put("/teacher/me", {
        bio: form.bio,
        experience: Number(form.experience),
        role: form.role,
        specialization: form.specialization.split(",").map(s => s.trim()).filter(Boolean),
      });
      toast.success("Profile updated!");
      await fetchProfile();
    } catch { toast.error("Update failed"); } finally { setUpdating(false); }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return toast.error("Select an image first");
    try {
      setUploadingAvatar(true);
      const fd = new FormData();
      fd.append("avatar", avatarFile);
      await API.patch("/teacher/me/avatar", fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Avatar updated!");
      setAvatarFile(null);
      setAvatarPreview(null);
      await fetchProfile();
    } catch { toast.error("Avatar upload failed"); } finally { setUploadingAvatar(false); }
  };

  if (loading) return (
    <div style={{ padding: '48px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="rounded-2xl skeleton" style={{ width: '112px', height: '112px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="skeleton rounded-lg" style={{ height: '28px', width: '192px' }} />
            <div className="skeleton rounded-lg" style={{ height: '16px', width: '128px' }} />
          </div>
        </div>
        <div className="skeleton rounded-2xl" style={{ height: '256px' }} />
        <div className="skeleton rounded-2xl" style={{ height: '160px' }} />
      </div>
    </div>
  );

  const avatarUrl = avatarPreview || profile?.userId?.avatar || profile?.avatar ||
    `https://ui-avatars.com/api/?name=${profile?.userId?.name || profile?.name || "T"}&background=6366f1&color=fff&size=128&font-size=0.35`;
  const displayName = profile?.userId?.name || profile?.name || "Teacher";
  const displayEmail = profile?.userId?.email || profile?.email || "";

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px' }}>

      {/* PROFILE HEADER CARD */}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
        style={{ marginBottom: '28px' }}
      >
        {/* Banner */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" style={{ height: '120px' }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent)]" />
        </div>

        {/* Avatar + Name */}
        <div style={{ padding: '0 40px 36px' }}>
          <div className="relative z-10 flex flex-col sm:flex-row items-start" style={{ gap: '20px', marginTop: '-44px' }}>
            {/* Avatar with camera overlay */}
            <div className="relative group" style={{ flexShrink: 0 }}>
              <img
                src={avatarUrl}
                alt="avatar"
                className="rounded-2xl object-cover shadow-xl"
                style={{ width: '96px', height: '96px', border: '4px solid white', backgroundColor: 'white' }}
              />
              <label
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200"
                style={{ border: '4px solid transparent' }}
              >
                <Camera size={20} className="text-white" />
                <input
                  type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const file = e.target.files[0]; setAvatarFile(file); if (file) setAvatarPreview(URL.createObjectURL(file)); }}
                />
              </label>
            </div>

            {/* Name + email */}
            <div className="flex-1" style={{ marginTop: '52px' }}>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{displayName}</h1>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400" style={{ marginTop: '2px' }}>{profile?.role || form.role || "Lecturer"}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '2px' }}>{displayEmail}</p>
              {avatarFile && (
                <button
                  onClick={handleAvatarUpload}
                  disabled={uploadingAvatar}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-xs font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-50"
                  style={{ marginTop: '12px', padding: '8px 14px' }}
                >
                  {uploadingAvatar
                    ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading...</>
                    : <><Save size={14} />Save Avatar</>}
                </button>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3" style={{ gap: '16px', marginTop: '32px' }}>
            {[
              { icon: Briefcase, val: profile?.experience || 0, label: "Years Exp.", bg: "bg-indigo-50 dark:bg-indigo-900/20", color: "text-indigo-500" },
              { icon: BookOpen, val: courses.length, label: "Courses", bg: "bg-purple-50 dark:bg-purple-900/20", color: "text-purple-500" },
              { icon: Award, val: profile?.specialization?.length || 0, label: "Skills", bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-500" },
            ].map(s => (
              <div
                key={s.label}
                className={`flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50`}
                style={{ gap: '12px', padding: '16px' }}
              >
                <div className={`rounded-xl ${s.bg} flex items-center justify-center`} style={{ width: '40px', height: '40px' }}>
                  <s.icon size={18} className={s.color} />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{s.val}</p>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDIT PROFILE CARD */}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
        style={{ padding: '36px 40px', marginBottom: '28px' }}
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white" style={{ marginBottom: '24px' }}>Edit Profile</h2>
        <form onSubmit={handleUpdate}>

          {/* Bio */}
          <div style={{ marginBottom: '20px' }}>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bio</label>
            <textarea
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm resize-none"
              style={{ marginTop: '10px', padding: '13px 16px', display: 'block' }}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '20px' }}>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Experience (years)</label>
            <input
              type="number"
              placeholder="e.g. 5"
              min="0"
              className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
              style={{ marginTop: '10px', padding: '13px 16px', display: 'block' }}
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />
          </div>

          {/* Role */}
          <div style={{ marginBottom: '20px' }}>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Academic Role</label>
            <select
              className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
              style={{ marginTop: '10px', padding: '13px 16px', display: 'block' }}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              {["Professor","Lecturer","Associate Professor","Assistant Professor","Dean","Head of Department","Research Fellow","Visiting Faculty","Industry Expert","Other"].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Specialization */}
          <div style={{ marginBottom: '32px' }}>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Specialization</label>
            <input
              type="text"
              placeholder="e.g. AI, Machine Learning, Deep Learning"
              className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
              style={{ marginTop: '10px', padding: '13px 16px', display: 'block' }}
              value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            />
            <p className="text-xs text-slate-400" style={{ marginTop: '6px' }}>Separate multiple skills with commas</p>
          </div>

          {/* FIX 2: Update Profile button at bottom of form */}
          <button
            type="submit"
            disabled={updating}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-50"
            style={{ padding: '13px 28px', fontSize: '14px', boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}
          >
            {updating
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Updating...</>
              : <><Save size={16} />Update Profile</>}
          </button>
        </form>
      </div>

      {/* MY COURSES CARD */}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
        style={{ padding: '36px 40px' }}
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white" style={{ marginBottom: '20px' }}>
          My Courses ({courses.length})
        </h2>
        {courses.length === 0 ? (
          <div className="text-center" style={{ padding: '40px 0' }}>
            <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto" style={{ width: '56px', height: '56px', marginBottom: '12px' }}>
              <BookOpen size={24} className="text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">No courses assigned yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 stagger" style={{ gap: '16px' }}>
            {courses.map((c) => (
              <div
                key={c._id}
                className="border border-slate-200 dark:border-slate-700/50 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ padding: '20px' }}
              >
                <h3 className="font-bold text-slate-900 dark:text-white">{c.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2" style={{ marginTop: '6px' }}>{c.description || "No description"}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default TeacherDashboard;
