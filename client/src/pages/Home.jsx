import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Card from "../components/ui/Card";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses")
      .then(res => setCourses(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />

        <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map(c => (
            <div key={c._id}
                className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow
                            hover:shadow-lg transition">

                {/* optional image placeholder */}
                <div className="h-32 bg-gray-200 dark:bg-slate-700 rounded mb-3" />

                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-500">
                {c.description}
                </p>
            </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;