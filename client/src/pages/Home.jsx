import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import heroImg from "../assets/hero.png";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);

  const handleProtectedClick = (path) => {
    if (!user) navigate("/login");
    else navigate(path);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res?.data?.data || []);
      } catch (err) {
        console.error("Courses fetch error:", err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Welcome to <br />
            <span className="text-indigo-600">School Expertise</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Explore academic curricula across all departments.
          </p>

          <button
            onClick={() => handleProtectedClick("/courses")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Explore Courses
          </button>
        </div>

        <div className="flex justify-center">
          <img src={heroImg} alt="hero" className="max-w-lg" />
        </div>
      </div>

      {/* COURSES */}
      <div className="mb-24">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Courses</h2>

          <button
            onClick={() => handleProtectedClick("/courses")}
            className="text-indigo-600"
          >
            View All →
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.length > 0 ? (
            courses.slice(0, 2).map((course) => {
              const tags =
                typeof course.category === "string"
                  ? course.category.split(",")
                  : ["General"];

              return (
                <div
                  key={course._id}
                  className="p-6 border rounded-xl bg-white hover:shadow"
                >
                  {/* TAGS */}
                  <div className="flex gap-2 mb-3">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {course.title || "Untitled"}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">
                    {(course.description || "").slice(0, 100)}
                  </p>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      {course.teachers?.length || 0} Teachers
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleProtectedClick(`/courses/${course._id}/teachers`)
                        }
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        View Teachers
                      </button>

                      <button
                        onClick={() =>
                          handleProtectedClick(`/courses/${course._id}`)
                        }
                        className="bg-indigo-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>

      {/* FEATURES */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Platform Features</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            onClick={() => handleProtectedClick("/courses")}
            className="p-6 border rounded-xl cursor-pointer"
          >
            📚 Explore Courses
          </div>

          <div
            onClick={() => handleProtectedClick("/teachers")}
            className="p-6 border rounded-xl cursor-pointer"
          >
            👨‍🏫 Learn from Teachers
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;