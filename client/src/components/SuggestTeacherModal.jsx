import { useEffect, useState } from "react";
import API from "../api/api";

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
    <div className="modal-overlay">
      <div className="modal">
        <h3>Assign Teacher</h3>
        <p>{course.title}</p>

        {teachers.length === 0 ? (
          <p>No teachers found</p>
        ) : (
          teachers.map(t => (
            <div key={t._id} className="card">
              <h4>{t.userId.name}</h4>
              <p>{t.userId.email}</p>
              <p>{t.bio}</p>
              <p>{t.specialization.join(", ")}</p>

              <button onClick={() => assign(t._id)}>
                Assign
              </button>
            </div>
          ))
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuggestTeacherModal;