import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { Users, ArrowLeft, ExternalLink, BookOpen } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try { const res = await API.get(`/courses/${id}`); setCourse(res.data.data); }
      catch (err) { console.error(err); toast.error("Failed to load course"); }
      finally { setLoading(false); }
    };
    fetchCourse();
  }, [id]);

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px' }}>

      {}
      <Link
        to="/courses"
        className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
        style={{ gap: '8px', marginBottom: '32px' }}
      >
        <ArrowLeft size={16} /> Back to Courses
      </Link>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="skeleton rounded-lg" style={{ height: '32px', width: '256px' }} />
          <div className="skeleton rounded-lg" style={{ height: '16px', width: '384px' }} />
          <div className="skeleton rounded-2xl" style={{ height: '128px', marginTop: '24px' }} />
        </div>
      ) : !course ? (
        <div
          className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
          style={{ padding: '80px 40px' }}
        >
          <p className="text-slate-500 dark:text-slate-400">Course not found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {}
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden relative"
            style={{ padding: '40px' }}
          >
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" style={{ height: '4px' }} />

            {}
            <div className="flex items-start" style={{ gap: '20px', marginBottom: '20px' }}>
              <div
                className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0"
                style={{ width: '52px', height: '52px' }}
              >
                <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{course.title}</h1>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed" style={{ marginTop: '8px' }}>
                  {course.description || "No description available"}
                </p>
              </div>
            </div>

            {}
            <div className="flex flex-wrap" style={{ gap: '8px', marginTop: '8px' }}>
              {course.category?.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  style={{ padding: '4px 10px' }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {}
          <div>
            <div className="flex items-center" style={{ gap: '12px', marginBottom: '28px' }}>
              <div
                className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center"
                style={{ width: '36px', height: '36px' }}
              >
                <Users size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Teachers ({course.teachers?.length || 0})
              </h2>
            </div>

            {course.teachers?.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 stagger" style={{ gap: '24px' }}>
                {course.teachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 group animate-slide-up"
                    style={{ padding: '28px' }}
                  >
                    {}
                    <div className="flex items-center" style={{ gap: '16px', marginBottom: '20px' }}>
                      <img
                        src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}&background=6366f1&color=fff&size=48&font-size=0.4`}
                        alt="avatar"
                        className="rounded-xl object-cover shadow-md"
                        style={{ width: '52px', height: '52px' }}
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{teacher.name}</p>
                        <p className="text-xs text-slate-400 truncate" style={{ marginTop: '2px' }}>{teacher.email}</p>
                      </div>
                    </div>

                    {}
                    <Link
                      to={`/teacher/${teacher._id}`}
                      className="flex items-center justify-center gap-2 w-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
                      style={{ padding: '10px' }}
                    >
                      View Profile <ExternalLink size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
                style={{ padding: '48px 40px' }}
              >
                <p className="text-slate-500 dark:text-slate-400 text-sm">No teachers assigned yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
