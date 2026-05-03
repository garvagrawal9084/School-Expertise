import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { Users, Search, ExternalLink } from "lucide-react";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try { 
        const res = await API.get("/teacher"); 
        setTeachers(res.data?.data || []); 
      }
      catch (err) { 
        console.error(err); 
        toast.error("Failed to load teachers"); 
      }
      finally { 
        setLoading(false); 
      }
    };
    fetchTeachers();
  }, []);

  const filtered = teachers.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase()) || 
    t.specialization?.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      className="animate-fade-in w-full"
      style={{ padding: '60px 48px' }}
    >
      {/* Header section matching Courses.jsx */}
      <div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between"
        style={{ gap: '16px', marginBottom: '48px' }}
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Our Faculty</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg" style={{ marginTop: '8px' }}>Meet our expert instructors and educators</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute text-slate-400" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by name or expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 font-medium"
            style={{ width: '288px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '44px', paddingRight: '16px' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '32px' }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className="rounded-3xl skeleton" style={{ height: '220px' }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
          style={{ padding: '80px 40px' }}
        >
          <Users size={48} className="mx-auto text-slate-300 dark:text-slate-600" style={{ marginBottom: '16px' }} />
          <p className="text-xl font-bold text-slate-900 dark:text-white" style={{ marginBottom: '8px' }}>
            {search ? `No teachers match "${search}"` : "No teachers found"}
          </p>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or check back later.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 stagger" style={{ gap: '32px' }}>
          {filtered.map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 group animate-slide-up flex flex-col"
              style={{ padding: '24px' }}
            >
              <div className="flex items-center" style={{ gap: '16px', marginBottom: '16px' }}>
                <img src={t.avatar || `https://ui-avatars.com/api/?name=${t.name}&background=6366f1&color=fff&size=56`} alt="avatar" className="rounded-xl object-cover shadow-md border-2 border-white dark:border-slate-800 shrink-0" style={{ width: '56px', height: '56px' }} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-lg text-slate-900 dark:text-white truncate">{t.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{t.email}</p>
                </div>
              </div>
              
              {t.specialization && t.specialization.length > 0 && (
                <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '24px' }}>
                  {t.specialization.map((s, i) => (
                    <span key={i} className="inline-flex items-center font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" style={{ padding: '4px 12px', fontSize: '12px' }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="border-t-2 border-slate-50 dark:border-slate-800/50" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                <Link to={`/teacher/${t._id}`}
                  className="flex items-center justify-center font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all"
                  style={{ gap: '8px', width: '100%', fontSize: '14px', padding: '12px 0' }}
                >
                  View Profile <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;
