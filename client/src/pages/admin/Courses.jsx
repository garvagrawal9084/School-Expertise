import { useEffect, useState } from "react";
import API from "../../api/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/admin/courses")
      .then(res => setCourses(res.data.data));
  }, []);

  return (
    <div>
      {courses.map(c => (
        <div key={c._id}>
          {c.title}
        </div>
      ))}
    </div>
  );
};

export default Courses;