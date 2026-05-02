import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { BookOpen, Users, Clock, ArrowRight, Plus, CheckCircle, TrendingUp, Activity, PartyPopper } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ courses: 0, teachers: 0, requests: 0 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, teachersRes, requestsRes] = await Promise.all([
          API.get("/admin/courses"), API.get("/admin/teachers"), API.get("/admin/requests"),
        ]);
        const requests = requestsRes.data.data;
        setStats({ courses: coursesRes.data.data.length, teachers: teachersRes.data.data.length, requests: requests.length });
        setRecentRequests(requests.slice(0, 3));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "TOTAL COURSES", value: stats.courses, subtitle: "Active subjects", icon: BookOpen, iconBg: "bg-indigo-50 dark:bg-indigo-900/20", iconColor: "text-indigo-600 dark:text-indigo-400", path: "/admin/courses" },
    { label: "ACTIVE EXPERTS", value: stats.teachers, subtitle: "Faculty members", icon: Users, iconBg: "bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-600 dark:text-emerald-400", path: "/admin/teachers" },
    { label: "PENDING REQUESTS", value: stats.requests, subtitle: stats.requests > 0 ? "Action required" : "All clear", icon: Clock, iconBg: "bg-amber-50 dark:bg-amber-900/20", iconColor: "text-amber-600 dark:text-amber-400", path: "/admin/teacher-requests" },
    { label: "EXPERTISE SCORE", value: "A+", subtitle: "Platform health", icon: TrendingUp, iconBg: "bg-purple-50 dark:bg-purple-900/20", iconColor: "text-purple-600 dark:text-purple-400", path: "/admin/dashboard" },
  ];

  return (
    <div className="animate-fade-in w-full" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {}
      <div className="flex items-center justify-between flex-wrap" style={{ gap: '16px' }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '4px' }}>Overview of your platform activity</p>
        </div>
        <div
          className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-100 dark:border-emerald-800/50"
          style={{ gap: '6px', padding: '6px 14px' }}
        >
          <Activity size={12} className="animate-pulse" /> LIVE UPDATES ACTIVE
        </div>
      </div>

      {}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '20px' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton rounded-2xl" style={{ height: '112px' }} />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 stagger" style={{ gap: '20px' }}>
          {statCards.map((card) => (
            <div
              key={card.label}
              onClick={() => navigate(card.path)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer group hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all duration-300 animate-slide-up"
              style={{ padding: '20px' }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</p>
                <div className={`rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{ width: '36px', height: '36px' }}>
                  <card.icon size={16} className={card.iconColor} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{card.value}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium" style={{ marginTop: '4px' }}>{card.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      {}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
        style={{ padding: '28px 32px' }}
      >
        <h2 className="font-bold text-slate-900 dark:text-white" style={{ marginBottom: '20px' }}>Quick Actions</h2>
        <div className="flex flex-wrap" style={{ gap: '12px' }}>
          <button
            onClick={() => navigate("/admin/add-course")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-sm hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200"
            style={{ padding: '11px 20px', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
          >
            <Plus size={16} /> New Course
          </button>
          <button
            onClick={() => navigate("/admin/teacher-requests")}
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-semibold text-sm border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
            style={{ padding: '11px 20px' }}
          >
            <CheckCircle size={16} /> Review Requests
          </button>
          <button
            onClick={() => navigate("/admin/teachers")}
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-semibold text-sm border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
            style={{ padding: '11px 20px' }}
          >
            <Users size={16} /> View Faculty
          </button>
        </div>
      </div>

      {}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
        style={{ padding: '28px 32px' }}
      >
        <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
          <h2 className="font-bold text-slate-900 dark:text-white">Recent Teacher Requests</h2>
          <button
            onClick={() => navigate("/admin/teacher-requests")}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline flex items-center"
            style={{ gap: '4px' }}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        {recentRequests.length === 0 ? (
          <div className="text-center" style={{ padding: '40px 0' }}>
            <div
              className="mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center"
              style={{ width: '56px', height: '56px', marginBottom: '12px' }}
            >
              <CheckCircle size={24} className="text-emerald-500" />
            </div>
            <p className="text-slate-900 dark:text-white font-medium">All caught up!</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center gap-1.5" style={{ marginTop: '4px' }}>
              No pending requests <PartyPopper size={16} className="text-amber-500" />
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentRequests.map((req) => (
              <div
                key={req._id}
                className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200"
                style={{ padding: '16px 20px' }}
              >
                <div className="flex items-center" style={{ gap: '12px' }}>
                  <div
                    className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-sm"
                    style={{ width: '40px', height: '40px' }}
                  >
                    {req.userId?.name?.[0] || "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{req.userId?.name}</p>
                    <p className="text-xs text-slate-500" style={{ marginTop: '2px' }}>{req.userId?.email}</p>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-100 dark:border-amber-800/50"
                  style={{ padding: '4px 12px' }}
                >
                  Pending
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;