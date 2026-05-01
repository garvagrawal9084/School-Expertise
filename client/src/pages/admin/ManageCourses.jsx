import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = () => {
    API.get("/admin/courses")
      .then((res) => setCourses(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Courses</h2>
          <p className="text-gray-500 text-sm">
            Create, assign and manage all courses
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-course")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Course
        </button>
      </div>

      {/* EMPTY STATE */}
      {courses.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500 mb-4">
            No courses created yet
          </p>
          <button
            onClick={() => navigate("/admin/add-course")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Create First Course
          </button>
        </div>
      ) : (

        /* COURSES GRID */
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >

              {/* TITLE */}
              <h3 className="text-lg font-semibold">
                {course.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-1">
                {course.description || "No description"}
              </p>

              {/* CATEGORY TAGS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {course.category.map((cat, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* TEACHER COUNT */}
              <p className="text-xs text-gray-400 mt-3">
                Teachers Assigned: {course.teachers?.length || 0}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">

                <button
                  onClick={() =>
                    navigate(`/admin/assign/${course._id}`)
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Assign Teacher
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCourses;