import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    courses: 0,
    teachers: 0,
    requests: 0,
  });

  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, teachersRes, requestsRes] =
          await Promise.all([
            API.get("/admin/courses"),
            API.get("/admin/teachers"),
            API.get("/admin/requests"),
          ]);

        const requests = requestsRes.data.data;

        setStats({
          courses: coursesRes.data.data.length,
          teachers: teachersRes.data.data.length,
          requests: requests.length,
        });

        // 🔥 take latest 3 requests
        setRecentRequests(requests.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Overview of your platform activity
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/admin/courses")}
          className="cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow"
        >
          <p className="text-sm opacity-80">Courses</p>
          <h2 className="text-3xl font-bold">{stats.courses}</h2>
        </div>

        <div
          onClick={() => navigate("/admin/teachers")}
          className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow"
        >
          <p className="text-sm opacity-80">Teachers</p>
          <h2 className="text-3xl font-bold">{stats.teachers}</h2>
        </div>

        <div
          onClick={() => navigate("/admin/teacher-requests")}
          className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow"
        >
          <p className="text-sm opacity-80">Pending Requests</p>
          <h2 className="text-3xl font-bold">{stats.requests}</h2>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/admin/courses")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Manage Courses
          </button>

          <button
            onClick={() => navigate("/admin/teacher-requests")}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Review Requests
          </button>
        </div>
      </div>

      {/* RECENT REQUESTS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Recent Teacher Requests</h2>

          <button
            onClick={() => navigate("/admin/teacher-requests")}
            className="text-indigo-600 text-sm"
          >
            View All →
          </button>
        </div>

        {recentRequests.length === 0 ? (
          <p className="text-gray-500 text-sm">No pending requests</p>
        ) : (
          <div className="space-y-3">
            {recentRequests.map((req) => (
              <div
                key={req._id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{req.userId?.name}</p>
                  <p className="text-xs text-gray-500">
                    {req.userId?.email}
                  </p>
                </div>

                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                  Pending
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;