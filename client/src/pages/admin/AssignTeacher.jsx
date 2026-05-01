import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";

const AssignTeacher = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await API.get("/admin/teachers");
        setTeachers(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeachers();
  }, []);

  // toggle select
  const toggleTeacher = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  // assign teachers
  const handleAssign = async () => {
    if (selected.length === 0) {
      return toast.error("Select at least one teacher");
    }

    try {
      setLoading(true);

      await API.post("/admin/assign", {
        courseId,
        teacherIds: selected,
      });

      toast.success("Teachers assigned successfully 🎉");
      navigate("/admin/courses");

    } catch (err) {
      console.error(err);
      toast.error("Failed to assign teachers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Assign Teachers</h1>
          <p className="text-gray-500 text-sm">
            Select teachers to assign to this course
          </p>
        </div>

        {/* TEACHER LIST */}
        <div className="grid md:grid-cols-2 gap-4">

          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              onClick={() => toggleTeacher(teacher._id)}
              className={`p-4 rounded-xl border cursor-pointer transition 
                ${
                  selected.includes(teacher._id)
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white dark:bg-[#1e293b] hover:shadow"
                }`}
            >
              <h3 className="font-semibold">{teacher.name}</h3>
              <p className="text-sm opacity-70">
                {teacher.email}
              </p>

              {selected.includes(teacher._id) && (
                <span className="text-xs mt-2 inline-block">
                  ✓ Selected
                </span>
              )}
            </div>
          ))}

        </div>

        {/* ACTION BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow"
          >
            {loading ? "Assigning..." : "Assign Teachers"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AssignTeacher;