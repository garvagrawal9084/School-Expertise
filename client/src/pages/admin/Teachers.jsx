import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { Trash2, Users, Search, ExternalLink } from "lucide-react";

const Teachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchTeachers = async () => {
    try { const res = await API.get("/admin/teachers"); setTeachers(res.data.data || []); }
    catch (err) { console.error(err); toast.error("Failed to load teachers"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this teacher?")) return;
    try { setDeletingId(userId); await API.delete(`/admin/teachers/${userId}`); toast.success("Teacher removed"); fetchTeachers(); }
    catch (err) { console.error(err); toast.error(err.response?.data?.message || "Failed to remove teacher"); }
    finally { setDeletingId(null); }
  };

  const filtered = teachers.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase()) || t.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between" style={{ gap: '20px' }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Active Teachers</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '4px' }}>
            {teachers.length} teacher{teachers.length !== 1 ? "s" : ""} on the platform
          </p>
        </div>
        {teachers.length > 0 && (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ left: '14px' }} />
            <input
              type="text"
              placeholder="Search teachers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
              style={{ width: '260px', padding: '10px 16px 10px 38px' }}
            />
          </div>
        )}
      </div>

      {/* LOADING OR TEACHERS GRID */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
          {[1,2,3,4,5,6].map((i) => <div key={i} className="skeleton rounded-2xl" style={{ height: '260px' }} />)}
        </div>
      ) : teachers.length === 0 ? (
        <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" style={{ padding: '64px 20px' }}>
          <Users size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No active teachers found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 stagger" style={{ gap: '24px' }}>
          {filtered.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-800 hover:-translate-y-1 transition-all duration-300 group animate-slide-up flex flex-col"
              style={{ padding: '28px' }}
            >
              <div className="flex items-start" style={{ gap: '16px', marginBottom: '16px' }}>
                <img
                  src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}&background=6366f1&color=fff&size=64&font-size=0.4`}
                  alt={teacher.name}
                  className="rounded-xl object-cover shadow-md"
                  style={{ width: '56px', height: '56px', flexShrink: 0 }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">{teacher.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium" style={{ marginTop: '2px' }}>Faculty Member</p>
                  <p className="text-xs text-slate-400 truncate" style={{ marginTop: '2px' }}>{teacher.email}</p>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1" style={{ marginBottom: '16px' }}>
                Expert educator contributing to the academic excellence of the platform.
              </p>

              <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '20px' }}>
                {teacher.specialization?.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    style={{ padding: '4px 10px' }}
                  >
                    {s}
                  </span>
                ))}
                {teacher.specialization?.length > 3 && (
                  <span
                    className="inline-flex items-center text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500"
                    style={{ padding: '4px 10px' }}
                  >
                    +{teacher.specialization.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex border-t border-slate-100 dark:border-slate-800 pt-5" style={{ gap: '8px' }}>
                <button
                  onClick={() => navigate(`/teacher/${teacher._id}`)}
                  className="flex-1 inline-flex items-center justify-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-semibold text-xs border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all shrink-0"
                  style={{ gap: '8px', padding: '10px' }}
                >
                  <ExternalLink size={13} /> View Profile
                </button>
                <button
                  onClick={() => handleDelete(teacher._id)}
                  disabled={deletingId === teacher._id}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 dark:border-red-800/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0 disabled:opacity-50"
                  style={{ width: '38px', height: '38px' }}
                  title="Remove"
                >
                  {deletingId === teacher._id ? (
                    <span className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin block" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && search && (
            <div className="col-span-full text-center" style={{ padding: '40px 0' }}>
              <p className="text-slate-500 dark:text-slate-400 text-sm">No teachers match "{search}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Teachers;
