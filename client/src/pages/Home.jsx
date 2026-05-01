// import Layout from "../components/layout/AdminLayout";
import { useEffect, useState } from "react";
import API from "../api/api";

const Home = () => {
  const [courses, setCourses] = useState([]);

  // Backend integration (for later use / debug)
  useEffect(() => {
    API.get("/courses")
      .then(res => setCourses(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
     <div className="max-w-6xl mx-auto px-6 py-6">

      {/* HERO SECTION */}
      <div className="bg-white dark:bg-[#1e293b] border rounded-xl p-6 shadow-sm mb-8">

        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          PLATFORM OVERVIEW
        </span>

        <h1 className="text-3xl font-bold mt-4 leading-tight">
          Manage Institutional Expertise with Precision and Clarity
        </h1>

        <p className="text-gray-500 mt-3">
          A centralized hub for tracking faculty specializations, subject mastery,
          and developmental progress across your entire academic organization.
        </p>

        <div className="flex gap-3 mt-5">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow">
            Launch Dashboard
          </button>

          <button className="border px-4 py-2 rounded-lg">
            View Documentation
          </button>
        </div>
      </div>

      {/* FEATURE GRID */}
      <div className="grid gap-4 mb-10">

        {/* Highlight card */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-5 rounded-xl shadow">
          <h3 className="font-semibold">Real-time Metrics</h3>
          <p className="text-sm mt-1 opacity-90">
            Instant visualization of departmental coverage and expertise gaps.
          </p>
        </div>

        {/* Other cards */}
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl shadow">
          <h3 className="font-semibold">Accredited Tracking</h3>
          <p className="text-sm text-gray-500 mt-1">
            Automatic verification of professional development and certifications.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl shadow">
          <h3 className="font-semibold">Faculty Synergy</h3>
          <p className="text-sm text-gray-500 mt-1">
            Analyze overlapping skill sets to foster collaborative curriculum development.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl shadow">
          <h3 className="font-semibold">Subject Mapping</h3>
          <p className="text-sm text-gray-500 mt-1">
            Dynamic visualization of subject coverage across grade levels.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl shadow">
          <h3 className="font-semibold">AI Recommendations</h3>
          <p className="text-sm text-gray-500 mt-1">
            Smart suggestions for faculty placement based on expertise alignment.
          </p>
        </div>

      </div>

      {/* CTA SECTION */}
      <div className="bg-[#020617] text-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold">
          Visualize Your Academic Network
        </h2>

        <p className="text-gray-300 mt-2">
          Get a bird's-eye view of your institution’s intellectual capital with our proprietary visualization tool.
        </p>

        <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg">
          Explore the Mesh
        </button>
      </div>

      {/* DEBUG / API CHECK (REMOVE LATER) */}
      <div className="text-sm text-gray-400">
        Loaded courses: {courses.length}
      </div>

    </div>
  );
};

export default Home;