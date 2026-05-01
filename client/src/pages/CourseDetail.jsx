import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/layout/AdminLayout";
import toast from "react-hot-toast";
import SuggestTeacherModal from "../components/SuggestTeacherModal";

const CourseDetail = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : !course ? (
          <p className="text-gray-500">Course not found</p>
        ) : (
          <>
            {/* TITLE */}
            <h1 className="text-2xl font-bold mb-3">
              {course.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mb-6">
              {course.description || "No description available"}
            </p>

            {/* TEACHERS */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                Assigned Teachers
              </h2>

              {course.teachers?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {course.teachers.map((teacher) => (
                    <div
                      key={teacher._id}
                      className="flex items-center gap-2 bg-white dark:bg-slate-900 border px-3 py-2 rounded-lg shadow"
                    >
                      <img
                        src={teacher.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm">
                        {teacher.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No teachers assigned yet
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Suggest Teacher
            </button>

          </>
        )}

      </div>

      {/* 🔥 MODAL */}
      {openModal && (
        <SuggestTeacherModal
          courseId={course?._id}
          onClose={() => setOpenModal(false)}
        />
      )}

    </Layout>
  );
};

export default CourseDetail;