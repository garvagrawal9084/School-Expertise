import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r min-h-screen p-6">
      <h2 className="text-lg font-bold text-indigo-600 mb-6">
        Admin Portal
      </h2>

      <div className="flex flex-col gap-4 text-gray-600">

        <Link to="/admin">Dashboard</Link>

        <Link to="/admin/courses">Courses</Link>

        <Link to="/admin/teacher-requests">Requests</Link>

      </div>
    </div>
  );
};

export default Sidebar;