import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { ArrowLeft, Star, Check, Search, BookOpen } from "lucide-react";

const AssignTeacher = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suggestRes, coursesRes] = await Promise.all([
          API.get(`/admin/suggestion/${courseId}`), API.get("/admin/courses"),
        ]);
        setTeachers(suggestRes.data.data || []);
        const course = coursesRes.data.data?.find(c => c._id === courseId);
        if (course) setCourseName(course.title);
      } catch (err) {
        console.error(err);
        try { const res = await API.get("/admin/teachers"); setTeachers(res.data.data || []); } catch { toast.error("Failed to load teachers"); }
      } finally { setLoading(false); }
    };
    fetchData();
  }, [courseId]);

  const toggleTeacher = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);

  const handleAssign = async () => {
    if (selected.length === 0) return toast.error("Select at least one teacher");
    try {
      setAssigning(true);
      const userIds = selected.map((teacherDocId) => { const t = teachers.find((t) => t._id === teacherDocId); return t?.userId?._id || t?.userId || teacherDocId; });
      await API.post("/admin/assign", { courseId, teacherIds: userIds });
      toast.success("Teachers assigned successfully 🎉");
      navigate("/admin/courses");
    } catch (err) { console.error(err); toast.error("Failed to assign teachers"); }
    finally { setAssigning(false); }
  };

  const filtered = teachers.filter((t) => {
    const name = t.userId?.name || t.name || "";
    const email = t.userId?.email || t.email || "";
    const specs = t.specialization?.join(" ") || "";
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || email.toLowerCase().includes(q) || specs.toLowerCase().includes(q);
  });

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {}
      <button
        onClick={() => navigate("/admin/courses")}
        className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium self-start"
        style={{ gap: '8px' }}
      >
        <ArrowLeft size={16} /> Back to Courses
      </button>

      {}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between" style={{ gap: '16px', marginTop: '-8px' }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Assign Teachers</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center" style={{ marginTop: '4px', gap: '6px' }}>
            <BookOpen size={14} className="text-indigo-500" />
            Course: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{courseName || "Loading..."}</span>
          </p>
        </div>
      </div>

      {}
      <div className="relative" style={{ maxWidth: '448px' }}>
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" style={{ left: '14px' }} />
        <input
          type="text"
          placeholder="Search teachers by name or expertise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
          style={{ padding: '12px 16px 12px 40px' }}
        />
      </div>

      {}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton rounded-2xl" style={{ height: '112px' }} />)}
        </div>
      ) : teachers.length === 0 ? (
        <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" style={{ padding: '64px 20px' }}>
          <p className="text-slate-500 dark:text-slate-400">No teachers match this course category</p>
        </div>
      ) : (
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((teacher, index) => {
            const isSelected = selected.includes(teacher._id);
            const name = teacher.userId?.name || teacher.name || "Unknown";
            const email = teacher.userId?.email || teacher.email || "";
            const avatar = teacher.userId?.avatar || teacher.avatar;
            const bio = teacher.bio || "";
            const specs = teacher.specialization || [];

            return (
              <div
                key={teacher._id}
                onClick={() => toggleTeacher(teacher._id)}
                className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-300 animate-slide-up flex items-start ${
                  isSelected
                    ? "bg-indigo-50 dark:bg-indigo-900/15 border-indigo-400 dark:border-indigo-600 shadow-lg shadow-indigo-500/10"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md"
                }`}
                style={{ padding: '20px', gap: '16px' }}
              >
                <img
                  src={avatar || `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&size=48&font-size=0.4`}
                  alt={name}
                  className="rounded-xl object-cover shadow-md shrink-0"
                  style={{ width: '48px', height: '48px' }}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap" style={{ gap: '8px' }}>
                    <h3 className="font-bold text-slate-900 dark:text-white">{name}</h3>
                    {index === 0 && (
                      <span
                        className="inline-flex items-center text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-100 dark:border-emerald-800/50"
                        style={{ gap: '4px', padding: '2px 8px' }}
                      >
                        <Star size={10} /> Best Match
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400" style={{ marginTop: '2px' }}>{email}</p>
                  
                  {bio && <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed" style={{ marginTop: '8px' }}>{bio}</p>}
                  
                  {specs.length > 0 && (
                    <div className="flex flex-wrap" style={{ gap: '6px', marginTop: '12px' }}>
                      {specs.map((s, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                          style={{ padding: '4px 10px' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className={`shrink-0 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800"
                  }`}
                  style={{ padding: '8px 16px' }}
                  onClick={(e) => { e.stopPropagation(); toggleTeacher(teacher._id); }}
                >
                  {isSelected ? <span className="flex items-center" style={{ gap: '4px' }}><Check size={14} /> Selected</span> : "Assign"}
                </button>
              </div>
            );
          })}
          
          {filtered.length === 0 && search && (
            <div className="text-center" style={{ padding: '32px 0' }}>
              <p className="text-slate-500 dark:text-slate-400 text-sm">No teachers match "{search}"</p>
            </div>
          )}
        </div>
      )}

      {}
      {teachers.length > 0 && (
        <div
          className="flex items-center justify-between bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-900/50 rounded-2xl sticky bottom-4 shadow-xl"
          style={{ padding: '16px 20px', zIndex: 10 }}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {selected.length} teacher{selected.length !== 1 ? "s" : ""} selected
          </p>
          <div className="flex" style={{ gap: '12px' }}>
            <button
              onClick={() => navigate("/admin/courses")}
              className="inline-flex items-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-semibold text-sm border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-all"
              style={{ gap: '8px', padding: '10px 20px' }}
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={assigning || selected.length === 0}
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ gap: '8px', padding: '10px 20px' }}
            >
              {assigning ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Assigning...</>
              ) : "Apply Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignTeacher;