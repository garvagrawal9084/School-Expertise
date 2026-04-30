import { useEffect, useState } from "react";
import API from "../../api/api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
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
    <div className="p-6 grid md:grid-cols-3 gap-4">
      {courses.map(c => (
        <Card key={c._id}>
          <h3>{c.title}</h3>
          <Button onClick={() => setSelected(c)}>
            Assign Teacher
          </Button>
        </Card>
      ))}

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