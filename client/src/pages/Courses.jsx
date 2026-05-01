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
      setCourses(res.data.data);
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
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Courses
        </h1>

        {/* LOADING / EMPTY */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No courses found</p>
        ) : (

          /* GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="block"
              >
                <div className="bg-white dark:bg-slate-900 border rounded-xl p-5 shadow hover:shadow-md hover:-translate-y-1 transition cursor-pointer">

                  {/* COURSE NAME */}
                  <h2 className="text-lg font-semibold mb-2">
                    {course.name}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {course.description || "No description available"}
                  </p>

                  {/* TEACHERS */}
                  {course.teachers?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {course.teachers.map((teacher) => (
                        <span
                          key={teacher._id}
                          className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded"
                        >
                          {teacher.name}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;