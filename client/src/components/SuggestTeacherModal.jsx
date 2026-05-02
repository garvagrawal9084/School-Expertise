import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { X, Star, UserPlus, AlertCircle, Search, BookOpen } from "lucide-react";

const SuggestTeacherModal = ({ course, onClose }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try { const res = await API.get(`/admin/suggestion/${course._id}`); setTeachers(res.data.data || []); }
      catch (err) { console.error(err); toast.error("Failed to load suggestions"); }
      finally { setLoading(false); }
    };
    fetch();
  }, [course._id]);

  const assign = async (teacher) => {
    const userId = teacher.userId?._id || teacher.userId;
    try {
      setAssigningId(teacher._id);
      await API.post("/admin/assign", { teacherIds: [userId], courseId: course._id });
      toast.success("Teacher assigned!");
      setTeachers((prev) => prev.filter((t) => t._id !== teacher._id));
    } catch (err) { console.error(err); toast.error("Failed to assign teacher"); }
    finally { setAssigningId(null); }
  };

  const filtered = teachers.filter((t) => {
    const name = t.userId?.name || t.name || "";
    const email = t.userId?.email || t.email || "";
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || email.toLowerCase().includes(q);
  });

  return (
    <div className="fixed z-50 flex items-center justify-center" style={{ top: 0, left: 0, right: 0, bottom: 0, padding: '16px' }}>
      <div className="absolute bg-slate-900/50 backdrop-blur-sm" style={{ top: 0, left: 0, right: 0, bottom: 0 }} onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col animate-scale-in" style={{ width: '100%', maxWidth: '512px', maxHeight: '80vh', backgroundColor: 'var(--tw-bg-opacity, 1)' }}>
        {/* HEADER */}
        <div className="border-b border-slate-100 dark:border-slate-800" style={{ padding: '24px' }}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Assign Teacher</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center" style={{ marginTop: '2px', gap: '6px' }}>
                <BookOpen size={13} className="text-indigo-500" /> Course: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{course.title}</span>
              </p>
            </div>
            <button onClick={onClose} className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" style={{ padding: '8px' }}><X size={18} /></button>
          </div>
          <div className="relative" style={{ marginTop: '16px' }}>
            <Search size={15} className="absolute text-slate-400" style={{ top: '50%', transform: 'translateY(-50%)', left: '12px' }} />
            <input type="text" placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
              style={{ width: '100%', padding: '10px 16px 10px 36px' }} />
          </div>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>{[1,2,3].map(i => <div key={i} className="skeleton rounded-xl" style={{ height: '96px' }} />)}</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
              <AlertCircle size={32} className="text-slate-300 dark:text-slate-600" style={{ margin: '0 auto', marginBottom: '12px' }} />
              <p className="text-slate-500 dark:text-slate-400 text-sm">{search ? `No match for "${search}"` : "No teachers match this course"}</p>
            </div>
          ) : (
            filtered.map((t, index) => {
              const name = t.userId?.name || t.name || "Unknown";
              const email = t.userId?.email || t.email || "";
              const avatar = t.userId?.avatar || t.avatar;
              return (
                <div key={t._id} className="relative bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 flex items-start" style={{ padding: '16px', gap: '12px' }}>
                  <img src={avatar || `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&size=44&font-size=0.4`} alt={name} className="rounded-xl object-cover shadow-md" style={{ width: '44px', height: '44px', flexShrink: 0 }} />
                  <div className="min-w-0" style={{ flex: 1 }}>
                    <div className="flex items-center" style={{ gap: '8px' }}>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{name}</h4>
                      {index === 0 && <span className="inline-flex items-center font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md" style={{ gap: '4px', padding: '2px 6px', fontSize: '9px' }}><Star size={8} /> Top</span>}
                    </div>
                    {email && <p className="text-xs text-slate-500" style={{ marginTop: '2px' }}>{email}</p>}
                    {t.bio && <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed" style={{ marginTop: '6px' }}>{t.bio}</p>}
                    {t.specialization?.length > 0 && (
                      <div className="flex flex-wrap" style={{ gap: '6px', marginTop: '8px' }}>
                        {t.specialization.map((s, i) => (
                          <span key={i} className="inline-flex items-center font-medium rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" style={{ padding: '2px 8px', fontSize: '10px' }}>{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => assign(t)} disabled={assigningId === t._id}
                    className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-50" style={{ flexShrink: 0, gap: '6px', padding: '8px 16px' }}>
                    <UserPlus size={13} /> {assigningId === t._id ? "..." : "Assign"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-100 dark:border-slate-800 flex justify-end" style={{ padding: '16px' }}>
          <button onClick={onClose} className="inline-flex items-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-semibold text-sm border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-all" style={{ gap: '8px', padding: '10px 20px' }}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SuggestTeacherModal;