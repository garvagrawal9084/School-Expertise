import { useEffect, useState } from "react";
import API from "../../api/api";
import SuggestTeacherModal from "../../components/SuggestTeacherModal";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    API.get("/admin/courses")
      .then(res => setCourses(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2>Admin Courses</h2>

      <div className="grid">
        {courses.map(c => (
          <div key={c._id} className="card">
            <h3>{c.title}</h3>
            <button onClick={() => setSelected(c)}>
              Assign Teacher
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <SuggestTeacherModal
          course={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Courses;