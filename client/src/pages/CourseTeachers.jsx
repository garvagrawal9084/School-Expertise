import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CourseTeachers = () => {
  const { id } = useParams();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const res = await API.get(`/courses/${id}/teachers`);
      setTeachers(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">Course Teachers</h1>

      {/* STATES */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : teachers.length === 0 ? (
        <p className="text-gray-500">No teachers found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow hover:shadow-xl transition duration-300"
            >
              {/* AVATAR + NAME */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    t.avatar
                      ? t.avatar
                      : `https://ui-avatars.com/api/?name=${t.name}&background=6366f1&color=fff`
                  }
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-md">{t.name}</p>
                  <p className="text-xs text-gray-400">
                    {t.email || "Instructor"}
                  </p>
                </div>
              </div>

              {/* EXTRA INFO (optional) */}
              <div className="text-sm text-gray-500 mb-4">
                {t.specialization || "Expert in this subject"}
              </div>

              {/* BUTTON */}
              <Link
                to={`/teacher/${t._id}`}
                className="block w-full text-center text-sm bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseTeachers;
