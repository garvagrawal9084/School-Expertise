import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { ArrowLeft, Briefcase, BookOpen, Award } from "lucide-react";

const TeacherProfile = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await API.get(`/teacher/${id}`); setTeacher(res.data.data); }
      catch (err) { console.error(err); toast.error("Failed to load teacher"); }
      finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px' }}>

      {/* Back link */}
      <Link
        to="/courses"
        className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
        style={{ gap: '8px', marginBottom: '32px' }}
      >
        <ArrowLeft size={16} /> Back
      </Link>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex items-center" style={{ gap: '24px' }}>
            <div className="rounded-2xl skeleton" style={{ width: '80px', height: '80px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="skeleton rounded-lg" style={{ height: '24px', width: '192px' }} />
              <div className="skeleton rounded-lg" style={{ height: '16px', width: '128px' }} />
            </div>
          </div>
          <div className="skeleton rounded-2xl" style={{ height: '128px', marginTop: '24px' }} />
        </div>
      ) : !teacher ? (
        <div
          className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
          style={{ padding: '80px 40px' }}
        >
          <p className="text-slate-500 dark:text-slate-400">Teacher not found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* PROFILE CARD */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            {/* Banner */}
            <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" style={{ height: '120px' }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
            </div>

            {/* Avatar + info */}
            <div style={{ padding: '0 40px 40px' }}>
              <div className="relative z-10 flex flex-col sm:flex-row items-start" style={{ gap: '20px', marginTop: '-40px' }}>
                <img
                  src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}&background=6366f1&color=fff&size=96&font-size=0.35`}
                  alt="avatar"
                  className="rounded-2xl object-cover shadow-xl"
                  style={{ width: '96px', height: '96px', border: '4px solid white', backgroundColor: 'white' }}
                />
                <div className="flex-1" style={{ marginTop: '56px' }}>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{teacher.name}</h1>
                  <div className="flex flex-wrap" style={{ gap: '8px', marginTop: '12px' }}>
                    {teacher.specialization?.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                        style={{ padding: '4px 10px' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: '16px', marginTop: '32px' }}>
                {[
                  { icon: Briefcase, val: teacher.experience || 0, label: "Years Exp.", bg: "bg-indigo-50 dark:bg-indigo-900/20", color: "text-indigo-500" },
                  { icon: BookOpen, val: teacher.courses?.length || 0, label: "Courses", bg: "bg-purple-50 dark:bg-purple-900/20", color: "text-purple-500" },
                  { icon: Award, val: teacher.specialization?.length || 0, label: "Skills", bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-500" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50"
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

          {/* BIO */}
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
            style={{ padding: '36px 40px' }}
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white" style={{ marginBottom: '12px' }}>About</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{teacher.bio || "No bio available"}</p>
          </div>

          {/* COURSES */}
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
            style={{ padding: '36px 40px' }}
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white" style={{ marginBottom: '20px' }}>
              Courses ({teacher.courses?.length || 0})
            </h2>
            {teacher.courses?.length > 0 ? (
              <div className="grid sm:grid-cols-2 stagger" style={{ gap: '16px' }}>
                {teacher.courses.map((course) => (
                  <Link
                    key={course._id}
                    to={`/courses/${course._id}`}
                    className="group border border-slate-200 dark:border-slate-700/50 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300 animate-slide-up"
                    style={{ padding: '20px' }}
                  >
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2" style={{ marginTop: '6px' }}>
                      {course.description || "No description"}
                    </p>
                  </Link>
                ))}
              </div>
            ) : <p className="text-slate-500 dark:text-slate-400 text-sm">No courses assigned</p>}
          </div>

        </div>
      )}
    </div>
  );
};

export default TeacherProfile;