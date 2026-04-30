import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

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

      <div className="container">
        <h2>Courses</h2>

        <div className="grid">
          {courses.map(c => (
            <div key={c._id} className="card">
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;