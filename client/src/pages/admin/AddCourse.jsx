import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { ArrowLeft, Plus, Tag } from "lucide-react";

const AddCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: [] });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCats, setLoadingCats] = useState(true);
  const [showOthers, setShowOthers] = useState(false);
  const [customCat, setCustomCat] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try { const res = await API.get("/admin/category"); setCategories(res.data?.data || []); }
      catch (err) { console.error(err); setCategories(["AI", "ML", "Deep Learning", "NLP", "Web Dev", "Frontend", "Backend", "Full Stack", "Data Science", "Cloud Computing", "Cyber Security"]); }
      finally { setLoadingCats(false); }
    };
    fetchCategories();
  }, []);

  const handleCategory = (cat) => setForm((prev) => ({ ...prev, category: prev.category.includes(cat) ? prev.category.filter((c) => c !== cat) : [...prev.category, cat] }));

  const handleAddCustom = () => {
    const trimmed = customCat.trim();
    if (!trimmed) return;
    if (form.category.includes(trimmed)) return toast.error("Already added");
    setForm((prev) => ({ ...prev, category: [...prev.category, trimmed] }));
    setCustomCat("");
    setShowOthers(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.category.length === 0) return toast.error("Select at least one category");
    try { setLoading(true); await API.post("/admin/create", form); toast.success("Course created 🎉"); navigate("/admin/courses"); }
    catch (err) { console.error(err); toast.error(err.response?.data?.message || "Failed to create course"); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => navigate("/admin/courses")} className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
        <ArrowLeft size={16} /> Back to Courses
      </button>
      <div className="max-w-2xl">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Course</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Add a new course and assign categories</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Course Title</label>
              <input type="text" placeholder="Enter course title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full mt-2 px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</label>
              <textarea placeholder="Enter course description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full mt-2 px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm resize-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Select Categories</label>
              {loadingCats ? (
                <div className="flex gap-2 mt-3">{[1,2,3,4,5].map(i => <div key={i} className="h-9 w-20 skeleton rounded-xl" />)}</div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-3">
                  {categories.map((cat) => (
                    <button key={cat} type="button" onClick={() => handleCategory(cat)}
                      className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 border-2 ${
                        form.category.includes(cat)
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25"
                          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                      }`}>
                      {cat}
                    </button>
                  ))}
                  {/* Custom categories added by user */}
                  {form.category.filter(c => !categories.includes(c)).map((cat) => (
                    <button key={cat} type="button" onClick={() => handleCategory(cat)}
                      className="px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 border-2 bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/25">
                      {cat} ✕
                    </button>
                  ))}
                  {/* Others button */}
                  <button type="button" onClick={() => setShowOthers((v) => !v)}
                    className={`inline-flex items-center px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 border-2 ${
                      showOthers
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/25"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-dashed border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500"
                    }`}
                    style={{ gap: '6px' }}>
                    <Tag size={13} /> Others
                  </button>
                </div>
              )}
              {/* Custom category input */}
              {showOthers && (
                <div className="flex items-center mt-3" style={{ gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Type custom category..."
                    value={customCat}
                    onChange={(e) => setCustomCat(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustom())}
                    className="border-2 border-emerald-300 dark:border-emerald-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
                    style={{ flex: 1, padding: '10px 14px' }}
                    autoFocus
                  />
                  <button type="button" onClick={handleAddCustom}
                    className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all"
                    style={{ padding: '10px 16px', gap: '6px', flexShrink: 0 }}>
                    <Plus size={14} /> Add
                  </button>
                </div>
              )}
              {form.category.length > 0 && (
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium">{form.category.length} selected: {form.category.join(", ")}</p>
              )}
            </div>
            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</> : <><Plus size={16} /> Create Course</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;