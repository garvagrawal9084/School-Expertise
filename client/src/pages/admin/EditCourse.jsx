import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save, Trash2, UserPlus, Users, Plus, Tag } from "lucide-react";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: [] });
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const [customCat, setCustomCat] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, catRes] = await Promise.all([
          API.get(`/courses/${id}`),
          API.get("/admin/category")
        ]);
        
        const course = courseRes.data.data;
        setForm({
          title: course.title || "",
          description: course.description || "",
          category: course.category || []
        });
        setTeachers(course.teachers || []);
        setCategories(catRes.data?.data || ["AI", "ML", "Deep Learning", "NLP", "Web Dev", "Frontend", "Backend", "Full Stack", "Data Science", "Cloud Computing", "Cyber Security"]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course details");
        navigate("/admin/courses");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat]
    }));
  };

  const handleAddCustom = () => {
    const trimmed = customCat.trim();
    if (!trimmed) return;
    if (form.category.includes(trimmed)) return toast.error("Already added");
    setForm((prev) => ({ ...prev, category: [...prev.category, trimmed] }));
    setCustomCat("");
    setShowOthers(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (form.category.length === 0) return toast.error("Select at least one category");
    try {
      setSaving(true);
      await API.put(`/admin/courses/${id}`, form);
      toast.success("Course updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    if (!window.confirm("Are you sure you want to remove this teacher from the course?")) return;
    try {
      await API.post("/admin/unassign", { teacherId, courseId: id });
      setTeachers((prev) => prev.filter((t) => t._id !== teacherId));
      toast.success("Teacher removed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove teacher");
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in w-full" style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div className="skeleton rounded-lg" style={{ height: '32px', width: '256px' }} />
        <div className="skeleton rounded-2xl" style={{ height: '400px' }} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-full" style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <button onClick={() => navigate("/admin/courses")} className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium self-start" style={{ gap: '8px' }}>
        <ArrowLeft size={16} /> Back to Courses
      </button>

      <div className="grid lg:grid-cols-3" style={{ gap: '32px' }}>
        {/* LEFT COLUMN: EDIT DETAILS */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm" style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Course Details</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '4px' }}>Update title, description, and categories</p>
            </div>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Course Title</label>
                <input type="text" placeholder="Enter course title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm"
                  style={{ marginTop: '8px', padding: '12px 16px' }} />
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</label>
                <textarea placeholder="Enter course description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-sm resize-none"
                  style={{ marginTop: '8px', padding: '12px 16px' }} />
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Select Categories</label>
                <div className="flex flex-wrap" style={{ gap: '8px', marginTop: '12px' }}>
                  {categories.map((cat) => (
                    <button key={cat} type="button" onClick={() => handleCategory(cat)}
                      className={`transition-all duration-200 border-2 rounded-xl text-sm font-medium ${
                        form.category.includes(cat)
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25"
                          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                      }`}
                      style={{ padding: '8px 16px' }}>
                      {cat}
                    </button>
                  ))}
                  {/* Custom categories added by user */}
                  {form.category.filter(c => !categories.includes(c)).map((cat) => (
                    <button key={cat} type="button" onClick={() => handleCategory(cat)}
                      className="transition-all duration-200 border-2 rounded-xl text-sm font-medium bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/25"
                      style={{ padding: '8px 16px' }}>
                      {cat} ✕
                    </button>
                  ))}
                  {/* Others button */}
                  <button type="button" onClick={() => setShowOthers((v) => !v)}
                    className={`inline-flex items-center transition-all duration-200 border-2 rounded-xl text-sm font-medium ${
                      showOthers
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/25"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-dashed border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500"
                    }`}
                    style={{ padding: '8px 16px', gap: '6px' }}>
                    <Tag size={13} /> Others
                  </button>
                </div>
                {/* Custom category input */}
                {showOthers && (
                  <div className="flex items-center" style={{ gap: '8px', marginTop: '12px' }}>
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
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium" style={{ marginTop: '8px' }}>{form.category.length} selected: {form.category.join(", ")}</p>
                )}
              </div>
              
              <button type="submit" disabled={saving}
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ gap: '8px', padding: '14px', marginTop: '16px' }}>
                {saving ? <><span className="border-2 border-white/30 border-t-white rounded-full animate-spin" style={{ width: '16px', height: '16px' }} />Saving...</> : <><Save size={16} /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: MANAGE TEACHERS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col" style={{ padding: '32px' }}>
          <div className="flex items-start justify-between" style={{ marginBottom: '24px' }}>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center" style={{ gap: '8px' }}>
                <Users size={20} className="text-indigo-500" /> Teachers
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm" style={{ marginTop: '4px' }}>{teachers.length} assigned</p>
            </div>
            <button onClick={() => navigate(`/admin/assign/${id}`)} title="Assign Teachers"
              className="inline-flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors shrink-0"
              style={{ width: '40px', height: '40px' }}>
              <UserPlus size={18} />
            </button>
          </div>

          <div className="overflow-y-auto" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {teachers.length === 0 ? (
              <div className="text-center" style={{ padding: '40px 0' }}>
                <p className="text-slate-500 dark:text-slate-400 text-sm">No teachers assigned</p>
              </div>
            ) : (
              teachers.map((teacher) => (
                <div key={teacher._id} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl flex items-center" style={{ padding: '12px', gap: '12px' }}>
                  <img src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}&background=6366f1&color=fff&size=40&font-size=0.4`} alt={teacher.name} className="rounded-xl object-cover shadow-sm shrink-0" style={{ width: '40px', height: '40px' }} />
                  <div className="min-w-0" style={{ flex: 1 }}>
                    <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{teacher.name}</p>
                    <p className="text-xs text-slate-500 truncate" style={{ marginTop: '2px' }}>{teacher.email}</p>
                  </div>
                  <button onClick={() => handleRemoveTeacher(teacher._id)} title="Remove Teacher"
                    className="inline-flex items-center justify-center rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                    style={{ width: '36px', height: '36px' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
