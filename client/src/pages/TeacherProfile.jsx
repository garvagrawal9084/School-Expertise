import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

const TeacherProfile = () => {
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTeacher = async () => {
    try {
      // ✅ YOUR CORRECT API
      const res = await API.get(`/teacher/${id}`);
      setTeacher(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load teacher");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {loading ? (
        <p className="text-gray-500 text-center">Loading profile...</p>
      ) : !teacher ? (
        <p className="text-gray-500 text-center">Teacher not found</p>
      ) : (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow p-8">

          {/* HEADER */}
          <div className="flex items-center gap-6 mb-8">

            <img
              src={
                teacher.avatar
                  ? teacher.avatar
                  : `https://ui-avatars.com/api/?name=${teacher.name}&background=6366f1&color=fff`
              }
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <h1 className="text-2xl font-bold">
                {teacher.name}
              </h1>
              <p className="text-gray-500 text-sm">
                {teacher.email}
              </p>

              <div className="flex gap-2 mt-2 flex-wrap">
                {teacher.specialization?.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* BIO */}
          <p className="text-gray-600 mb-6">
            {teacher.bio || "No bio available"}
          </p>

          {/* EXPERIENCE */}
          <p className="text-sm text-gray-400 mb-8">
            Experience: {teacher.experience || 0} years
          </p>

          {/* COURSES */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Courses by this teacher
            </h2>

            {teacher.courses?.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">

                {teacher.courses.map((course) => (
                  <div
                    key={course._id}
                    className="border p-4 rounded-xl bg-gray-50 dark:bg-slate-900 hover:shadow"
                  >
                    <h3 className="font-semibold">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {course.description}
                    </p>
                  </div>
                ))}

              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No courses assigned
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default TeacherProfile;