import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { Users, ArrowRight, BookOpen, Search } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try { const res = await API.get("/courses"); setCourses(res.data?.data || []); }
      catch (err) { console.error(err); toast.error("Failed to load courses"); }
      finally { setLoading(false); }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase()) || c.category?.some(cat => cat.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      className="animate-fade-in w-full"
      style={{ padding: '60px 48px' }}
    >
      {/* Header row */}
      <div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between"
        style={{ gap: '16px', marginBottom: '48px' }}
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">All Courses</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg" style={{ marginTop: '8px' }}>Browse our complete academic catalog</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute text-slate-400" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 font-medium"
            style={{ width: '288px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '44px', paddingRight: '16px' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '32px' }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className="rounded-3xl skeleton" style={{ height: '280px' }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
          style={{ padding: '80px 40px' }}
        >
          <BookOpen size={48} className="mx-auto text-slate-300 dark:text-slate-600" style={{ marginBottom: '16px' }} />
          <p className="text-xl font-bold text-slate-900 dark:text-white" style={{ marginBottom: '8px' }}>
            {search ? `No courses match "${search}"` : "No courses found"}
          </p>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or check back later.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 stagger" style={{ gap: '32px' }}>
          {filtered.map((course) => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="group flex flex-col bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl hover:border-indigo-600 dark:hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 animate-slide-up"
              style={{ padding: '32px' }}
            >
              {/* Tags */}
              <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '20px' }}>
                {course.category?.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                    style={{ padding: '4px 10px' }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2
                className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug"
                style={{ marginBottom: '12px' }}
              >
                {course.title}
              </h2>

              {/* Description */}
              <p
                className="text-slate-500 dark:text-slate-400 text-sm flex-1 line-clamp-3 leading-relaxed"
                style={{ marginBottom: '24px' }}
              >
                {course.description || "No description available"}
              </p>

              {/* Footer row */}
              <div
                className="flex items-center justify-between border-t-2 border-slate-50 dark:border-slate-800"
                style={{ paddingTop: '20px' }}
              >
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                    <Users size={14} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {course.teachers?.length || 0} Faculty
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors text-slate-400 dark:text-slate-500">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
