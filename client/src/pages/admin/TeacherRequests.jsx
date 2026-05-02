import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";

const TeacherRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try { const res = await API.get("/admin/requests"); setRequests(res.data.data || []); }
    catch (err) { console.error(err); toast.error("Failed to load requests"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleApprove = async (id) => {
    try { setLoadingId(id); await API.post(`/admin/approve/${id}`); toast.success("Teacher approved!"); fetchRequests(); }
    catch { toast.error("Failed to approve"); } finally { setLoadingId(null); }
  };

  const handleReject = async (id) => {
    try { setLoadingId(id); await API.post(`/admin/reject/${id}`); toast.success("Request rejected"); fetchRequests(); }
    catch { toast.error("Failed to reject"); } finally { setLoadingId(null); }
  };

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Teacher Requests</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '4px' }}>Review and approve teacher applications</p>
      </div>

      {/* LIST OR LOADING OR EMPTY */}
      {loading ? (
        <div className="grid md:grid-cols-2" style={{ gap: '24px' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton rounded-2xl" style={{ height: '220px' }} />)}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" style={{ padding: '64px 20px' }}>
          <div
            className="mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center"
            style={{ width: '64px', height: '64px', marginBottom: '16px' }}
          >
            <CheckCircle size={28} className="text-emerald-500" />
          </div>
          <p className="text-slate-900 dark:text-white font-bold text-lg">All caught up!</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '4px' }}>No pending requests 🎉</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 stagger" style={{ gap: '24px' }}>
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 animate-slide-up flex flex-col"
              style={{ padding: '28px' }}
            >
              {/* Card Header */}
              <div className="flex items-center" style={{ gap: '12px' }}>
                <div
                  className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-indigo-500/20 shrink-0"
                  style={{ width: '48px', height: '48px' }}
                >
                  {req.userId?.name?.[0] || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{req.userId?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate" style={{ marginTop: '2px' }}>{req.userId?.email}</p>
                </div>
                <span
                  className="inline-flex items-center text-xs font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-100 dark:border-amber-800/50 shrink-0"
                  style={{ gap: '4px', padding: '6px 12px' }}
                >
                  <Clock size={12} /> Pending
                </span>
              </div>

              {/* Message Box */}
              {req.message && (
                <div
                  className="flex items-start text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 flex-1"
                  style={{ marginTop: '20px', gap: '10px', padding: '16px' }}
                >
                  <MessageSquare size={14} className="text-slate-400 shrink-0" style={{ marginTop: '2px' }} />
                  <p className="leading-relaxed">{req.message}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex" style={{ gap: '12px', marginTop: req.message ? '24px' : '32px' }}>
                <button
                  onClick={() => handleApprove(req._id)}
                  disabled={loadingId === req._id}
                  className="flex-1 inline-flex items-center justify-center bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-50"
                  style={{ gap: '8px', padding: '12px' }}
                >
                  <CheckCircle size={15} /> {loadingId === req._id ? "..." : "Approve"}
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  disabled={loadingId === req._id}
                  className="flex-1 inline-flex items-center justify-center rounded-xl font-semibold text-sm border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50"
                  style={{ gap: '8px', padding: '12px' }}
                >
                  <XCircle size={15} /> {loadingId === req._id ? "..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherRequests;