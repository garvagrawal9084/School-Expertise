import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">Courses</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow hover:shadow-lg transition"
            >
              {/* CATEGORY */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {course.category?.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* TITLE */}
              <h2 className="text-lg font-semibold mb-2">{course.title}</h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                {course.description || "No description available"}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">
                {/* COUNT */}
                <span className="text-xs text-gray-400">
                  {course.teachers?.length || 0} Teachers
                </span>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  {/* VIEW TEACHERS */}
                  <Link
                    to={`/courses/${course._id}/teachers`}
                    className="bg-gray-200 text-gray-700 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-300 transition"
                  >
                    View Teachers
                  </Link>

                  {/* VIEW COURSE */}
                  <Link
                    to={`/courses/${course._id}`}
                    className="bg-indigo-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-indigo-700 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
