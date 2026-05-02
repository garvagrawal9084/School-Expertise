import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { ArrowLeft, ExternalLink } from "lucide-react";

const CourseTeachers = () => {
  const { id } = useParams();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await API.get(`/courses/${id}/teachers`); setTeachers(res.data.data || []); }
      catch (err) { console.error(err); toast.error("Failed to load teachers"); }
      finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in">
      <Link to={`/courses/${id}`} className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors font-medium">
        <ArrowLeft size={16} /> Back to Course
      </Link>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Course Teachers</h1>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3].map(i => <div key={i} className="h-44 skeleton rounded-2xl" />)}</div>
      ) : teachers.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-500 dark:text-slate-400">No teachers found for this course</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {teachers.map((t) => (
            <div key={t._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 group animate-slide-up">
              <div className="flex items-center gap-4 mb-4">
                <img src={t.avatar || `https://ui-avatars.com/api/?name=${t.name}&background=6366f1&color=fff&size=48&font-size=0.4`} alt="avatar" className="w-12 h-12 rounded-xl object-cover shadow-md" />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{t.name}</p>
                  <p className="text-xs text-slate-400 truncate">{t.email || "Instructor"}</p>
                </div>
              </div>
              {t.specialization && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(Array.isArray(t.specialization) ? t.specialization : [t.specialization]).map((s, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{s}</span>
                  ))}
                </div>
              )}
              <Link to={`/teacher/${t._id}`}
                className="flex items-center justify-center gap-2 w-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all">
                View Profile <ExternalLink size={13} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseTeachers;
