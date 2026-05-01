import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";

const categories = [
  "AI","ML","Deep Learning","NLP",
  "Web Dev","Frontend","Backend","Full Stack",
  "Data Science","Cloud Computing","Cyber Security"
];

const AddCourse = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: [],
  });

  const [loading, setLoading] = useState(false);

  const handleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/admin/create", form);

      toast.success("Course created successfully 🎉");
      navigate("/admin/courses");

    } catch (err) {
      console.error(err);
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-8 space-y-6">

          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-bold">Create New Course</h2>
            <p className="text-gray-500 text-sm mt-1">
              Add a new course and assign categories
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-500">
                Course Title
              </label>
              <input
                type="text"
                placeholder="Enter course title"
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm text-gray-500">
                Description
              </label>
              <textarea
                placeholder="Enter course description"
                rows={3}
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-500">
                Select Categories
              </label>

              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategory(cat)}
                    className={`px-3 py-1.5 text-sm rounded-full transition ${
                      form.category.includes(cat)
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;