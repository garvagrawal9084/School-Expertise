import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const CourseDetail = () => {
  const { id } = useParams();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    API.get(`/courses/${id}`)
      .then(res => setTeachers(res.data.data))
      .catch(console.error);
  }, [id]);

  return (
    <div className="container">
      <h2>Teachers</h2>

      <div className="grid">
        {teachers.map((t, i) => (
          <div key={i} className="card">
            <h4>{t.name}</h4>
            <p>{t.bio}</p>
            <p>{t.specialization.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;