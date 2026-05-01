import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";

// PUBLIC PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";

// ADMIN PAGES
import Dashboard from "./pages/admin/Dashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import TeacherRequests from "./pages/admin/TeacherRequests";
import AddCourse from "./pages/admin/AddCourse";

// TEACHER PAGE
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

// ROUTE PROTECTION
import AdminRoute from "./routes/AdminRoute";
import TeacherRoute from "./routes/TeacherRoute";

// 🔥 Layout wrapper to control Navbar
const Layout = ({ children }) => {
  const location = useLocation();

  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>

      <Layout>
        {/* GLOBAL TOAST */}
        <Toaster position="top-right" />

        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* 🔐 ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/courses"
            element={
              <AdminRoute>
                <ManageCourses />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/teacher-requests"
            element={
              <AdminRoute>
                <TeacherRequests />
              </AdminRoute>
            }
          />

          {/* 🔐 TEACHER */}
          <Route
            path="/teacher"
            element={
              <TeacherRoute>
                <TeacherDashboard />
              </TeacherRoute>
            }
          />

          {/* Redirect old route */}
          <Route path="/admin/dashboard" element={<Navigate to="/admin" />} />

          <Route
  path="/admin/add-course"
  element={
    <AdminRoute>
      <AddCourse />
    </AdminRoute>
  }
/>

        </Routes>
      </Layout>

    </Router>
  );
}

export default App;