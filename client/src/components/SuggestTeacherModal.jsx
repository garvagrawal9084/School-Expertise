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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-scale-in">
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Assign Teacher</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                <BookOpen size={13} className="text-indigo-500" /> Course: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{course.title}</span>
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={18} /></button>
          </div>
          <div className="relative mt-4">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm" />
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 skeleton rounded-xl" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <AlertCircle size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-slate-500 dark:text-slate-400 text-sm">{search ? `No match for "${search}"` : "No teachers match this course"}</p>
            </div>
          ) : (
            filtered.map((t, index) => {
              const name = t.userId?.name || t.name || "Unknown";
              const email = t.userId?.email || t.email || "";
              const avatar = t.userId?.avatar || t.avatar;
              return (
                <div key={t._id} className="relative bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-4 rounded-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 flex items-start gap-3">
                  <img src={avatar || `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&size=44&font-size=0.4`} alt={name} className="w-11 h-11 rounded-xl object-cover shadow-md shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{name}</h4>
                      {index === 0 && <span className="inline-flex items-center gap-1 text-[9px] font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-md"><Star size={8} /> Top</span>}
                    </div>
                    {email && <p className="text-xs text-slate-500 mt-0.5">{email}</p>}
                    {t.bio && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{t.bio}</p>}
                    {t.specialization?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {t.specialization.map((s, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => assign(t)} disabled={assigningId === t._id}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-2 rounded-xl font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-50">
                    <UserPlus size={13} /> {assigningId === t._id ? "..." : "Assign"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button onClick={onClose} className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl font-semibold text-sm border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-all">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SuggestTeacherModal;