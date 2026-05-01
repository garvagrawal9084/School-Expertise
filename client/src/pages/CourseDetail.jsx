import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CourseDetail = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* LOADING */}
      {loading ? (
        <div className="text-center text-gray-500">Loading course...</div>
      ) : !course ? (
        <div className="text-center text-gray-500">Course not found</div>
      ) : (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow p-6">
          {/* ================= TITLE ================= */}
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>

          {/* ================= DESCRIPTION ================= */}
          <p className="text-gray-500 mb-6">
            {course.description || "No description available"}
          </p>

          {/* ================= CATEGORY ================= */}
          <div className="flex flex-wrap gap-2 mb-8">
            {course.category?.map((cat) => (
              <span
                key={cat}
                className="bg-indigo-100 text-indigo-600 px-3 py-1 text-xs rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* ================= TEACHERS ================= */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Teachers ({course.teachers?.length || 0})
            </h2>

            {course.teachers?.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.teachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="bg-gray-50 dark:bg-slate-900 border rounded-2xl p-5 shadow hover:shadow-xl transition duration-300"
                  >
                    {/* AVATAR + NAME */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={
                          teacher.avatar
                            ? teacher.avatar
                            : `https://ui-avatars.com/api/?name=${teacher.name}&background=6366f1&color=fff`
                        }
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <p className="font-semibold text-md">{teacher.name}</p>
                        <p className="text-xs text-gray-400">{teacher.email}</p>
                      </div>
                    </div>

                    {/* ACTION */}
                    <Link
                      to={`/teacher/${teacher._id}`}
                      className="block w-full text-center text-sm bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No teachers assigned yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
