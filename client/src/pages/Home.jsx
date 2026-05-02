import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { BookOpen, Users, ArrowRight, TrendingUp } from "lucide-react";
import heroImg from "../assets/hero.png";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleProtectedClick = (path) => {
    if (!user) navigate("/login");
    else navigate(path);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res?.data?.data || []);
      } catch (err) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-[#0b1120]">

      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden bg-white dark:bg-[#0b1120] border-b border-slate-100 dark:border-slate-800"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-50 to-transparent dark:from-indigo-900/10 dark:to-transparent rounded-full blur-3xl pointer-events-none" />

        <div
          className="relative z-10 w-full flex flex-col lg:flex-row items-center"
          style={{ paddingLeft: '48px', paddingRight: '48px', gap: '48px' }}
        >
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight" style={{ marginBottom: '24px' }}>
              Welcome to <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                School Expertise
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ marginBottom: '32px' }}>
              Explore academic curricula across all departments. Track faculty mastery and developmental progress in one centralized hub.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start" style={{ gap: '16px' }}>
              <button
                onClick={() => handleProtectedClick("/courses")}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl font-bold text-base hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all whitespace-nowrap"
                style={{ padding: '14px 32px' }}
              >
                Explore Courses
              </button>
              <button
                onClick={() => handleProtectedClick(user ? "/dashboard" : "/login")}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-base border border-slate-200 dark:border-slate-700 hover:border-indigo-200 hover:bg-slate-50 transition-all whitespace-nowrap"
                style={{ padding: '14px 32px' }}
              >
                Platform Demo
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none hidden md:block">
            <img 
              src={heroImg} 
              alt="School Expertise Platform Dashboard" 
              className="w-full object-contain rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-800"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </section>

      {/* ============ COURSES ============ */}
      <section style={{ marginTop: '80px', marginBottom: '60px', paddingTop: '40px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px' }}>
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end" style={{ marginBottom: '48px', gap: '16px' }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white" style={{ marginBottom: '8px' }}>
                Popular Courses
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                Trending academic pathways this semester
              </p>
            </div>
            <button
              onClick={() => handleProtectedClick("/courses")}
              className="group flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 transition-colors whitespace-nowrap"
            >
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '40px' }}>
              {[1, 2, 3].map((i) => <div key={i} className="bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" style={{ height: '280px' }} />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '40px' }}>
              {courses.slice(0, 3).map((course) => {
                return (
                  <div
                    key={course._id}
                    className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ padding: '48px' }}
                    onClick={() => handleProtectedClick(`/courses/${course._id}`)}
                  >
                    <div className="flex items-center justify-between" style={{ marginBottom: '32px', gap: '16px' }}>
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                        <BookOpen size={20} className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded truncate" style={{ padding: '6px 12px' }}>
                        Computer Science
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1" style={{ marginBottom: '12px' }}>
                      {course.title || "Untitled Course"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex-1 line-clamp-2 leading-relaxed" style={{ marginBottom: '40px' }}>
                      {course.description || "No description available"}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800" style={{ paddingTop: '24px' }}>
                      <div className="flex items-center" style={{ gap: '8px' }}>
                        <Users size={16} className="text-slate-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                          {course.teachers?.length || 0} Faculty
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section
        className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
        style={{ marginTop: '100px', marginBottom: '60px', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '48px', paddingRight: '48px' }}
      >
        <div>
          <div style={{ marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white" style={{ marginBottom: '16px', textAlign: 'center' }}>
              Platform Features
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '42rem' }}>
              Designed to empower both institutions and students through modular learning pathways.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3" style={{ gap: '40px' }}>
            {[
              { icon: BookOpen, title: "Explore Courses", desc: "Discover specialized modules across diverse academic departments." },
              { icon: Users, title: "Learn from Teachers", desc: "Engage with verified experts with high mastery in their specific fields." },
              { icon: TrendingUp, title: "Structured Learning", desc: "Track your developmental progress with precise academic milestones." },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                style={{ padding: '56px 40px' }}
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center" style={{ marginBottom: '24px' }}>
                  <feature.icon size={28} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white" style={{ marginBottom: '12px' }}>{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;