import { useEffect, useState } from "react";
import API from "../api/api";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

const SuggestTeacherModal = ({ course, onClose }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    API.get(`/admin/suggestion/${course._id}`)
      .then(res => setTeachers(res.data.data))
      .catch(console.error);
  }, []);

  const assign = async (id) => {
    await API.post("/admin/assign", {
      teacherId: id,
      courseId: course._id,
    });

    setTeachers(prev => prev.filter(t => t._id !== id));
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="font-bold text-lg mb-2">Assign Teacher</h2>
      <p className="text-sm mb-4">{course.title}</p>

      {teachers.length === 0 ? (
        <p>No teachers available</p>
      ) : (
        teachers.map((t, index) => (
        <div key={t._id} className="border p-3 rounded mb-2 relative">

            {index === 0 && (
            <span className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                Recommended
            </span>
            )}

            <h4 className="font-semibold">{t.userId.name}</h4>
            <p className="text-sm text-gray-500">{t.bio}</p>

            <div className="flex gap-2 mt-2 flex-wrap">
            {t.specialization.map((s, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-600 px-2 py-1 text-xs rounded">
                {s}
                </span>
            ))}
            </div>

            <button
            onClick={() => assign(t._id)}
            className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded"
            >
            Assign
            </button>
        </div>
        ))
      )}
    </Modal>
  );
};

export default SuggestTeacherModal;