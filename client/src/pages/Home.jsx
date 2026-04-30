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

      <div className="p-6 grid md:grid-cols-3 gap-4">
        {courses.map(c => (
          <Card key={c._id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;