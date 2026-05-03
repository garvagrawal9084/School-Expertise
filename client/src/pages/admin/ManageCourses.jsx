import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import toast from "react-hot-toast";
import { Plus, Users, Trash2, UserPlus, BookOpen, Search, AlertTriangle, Edit2 } from "lucide-react";
import SuggestTeacherModal from "../../components/SuggestTeacherModal";

const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [suggestCourse, setSuggestCourse] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCourses = async () => {
    try { const res = await API.get("/admin/courses"); setCourses(res.data.data || []); }
    catch (err) { console.error(err); toast.error("Failed to load courses"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try { setDeletingId(id); await API.delete(`/admin/courses/${id}`); toast.success("Course deleted"); fetchCourses(); }
    catch (err) { console.error(err); toast.error("Failed to delete course"); }
    finally { setDeletingId(null); }
  };

  const filtered = courses.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.some(cat => cat.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between" style={{ gap: '20px' }}>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Courses</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '4px' }}>Create, assign and manage all courses</p>
        </div>
        <div className="flex items-center" style={{ gap: '16px' }}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ left: '14px' }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
              style={{ width: '240px', padding: '10px 16px 10px 38px' }}
            />
          </div>
          <button
            onClick={() => navigate("/admin/add-course")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-sm hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 shrink-0"
            style={{ padding: '11px 20px', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
          >
            <Plus size={16} /> New Course
          </button>
        </div>
      </div>

      {}
      <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: '20px' }}>
        {[
          { label: "TOTAL COURSES", val: courses.length },
          { label: "WITH TEACHERS", val: courses.filter(c => c.teachers?.length > 0).length },
          { label: "UNASSIGNED", val: courses.filter(c => !c.teachers?.length).length, amber: true },
          { label: "CATEGORIES", val: new Set(courses.flatMap(c => c.category || [])).size },
        ].map(s => (
          <div
            key={s.label}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:-translate-y-0.5 transition-all duration-200"
            style={{ padding: '20px' }}
          >
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.amber ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-white"}`} style={{ marginTop: '4px' }}>
              {s.val}
            </p>
          </div>
        ))}
      </div>

      {}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton rounded-2xl" style={{ height: '220px' }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" style={{ padding: '64px 20px' }}>
          <BookOpen size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-slate-500 dark:text-slate-400 mb-4">{search ? `No courses match "${search}"` : "No courses created yet"}</p>
          {!search && (
            <button
              onClick={() => navigate("/admin/add-course")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ padding: '11px 20px', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
            >
              <Plus size={16} /> Create First Course
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 stagger" style={{ gap: '24px' }}>
          {filtered.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-800 hover:-translate-y-1 transition-all duration-300 group animate-slide-up flex flex-col"
              style={{ padding: '28px' }}
            >
              {}
              <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '16px' }}>
                {course.category?.map((cat, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    style={{ padding: '4px 10px' }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1" style={{ marginTop: '8px', marginBottom: '16px' }}>
                {course.description || "No description"}
              </p>

              {}
              <div className="flex items-center" style={{ gap: '8px', marginBottom: '20px' }}>
                {course.teachers?.length > 0 ? (
                  <div className="flex items-center" style={{ gap: '6px' }}>
                    <div className="flex -space-x-2">
                      {course.teachers.slice(0, 3).map((teacher, i) => (
                        teacher.avatar ? (
                          <img
                            key={i}
                            src={teacher.avatar}
                            alt={teacher.name || "Teacher"}
                            className="rounded-full border-2 border-white dark:border-slate-900 object-cover"
                            style={{ width: '28px', height: '28px' }}
                          />
                        ) : (
                          <div
                            key={i}
                            className="rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold uppercase"
                            style={{ width: '28px', height: '28px' }}
                          >
                            {teacher.name ? teacher.name.charAt(0) : ""}
                          </div>
                        )
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
                      {course.teachers.length} Teacher{course.teachers.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center text-xs font-medium text-amber-600 dark:text-amber-400" style={{ gap: '4px' }}>
                    <AlertTriangle size={12} /> Unassigned
                  </span>
                )}
              </div>

              {}
              <div className="flex border-t border-slate-100 dark:border-slate-800 pt-5" style={{ gap: '10px' }}>
                <button
                  onClick={() => navigate(`/admin/assign/${course._id}`)}
                  className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-xs hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 shrink-0"
                  style={{ gap: '8px', padding: '10px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}
                >
                  <UserPlus size={14} /> Assign Teacher
                </button>
                <button
                  onClick={() => setSuggestCourse(course)}
                  className="inline-flex items-center justify-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all shrink-0"
                  style={{ width: '38px', height: '38px' }}
                  title="Suggest Teachers"
                >
                  <Users size={14} />
                </button>
                <button
                  onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                  className="inline-flex items-center justify-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all shrink-0"
                  style={{ width: '38px', height: '38px' }}
                  title="Edit Course"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  disabled={deletingId === course._id}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 dark:border-red-800/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 shrink-0"
                  style={{ width: '38px', height: '38px' }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {suggestCourse && <SuggestTeacherModal course={suggestCourse} onClose={() => { setSuggestCourse(null); fetchCourses(); }} />}
    </div>
  );
};

export default ManageCourses;