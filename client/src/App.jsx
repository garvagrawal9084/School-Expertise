import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseTeachers from "./pages/CourseTeachers";
import TeacherProfile from "./pages/TeacherProfile";
import Teachers from "./pages/Teachers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";

// Teacher
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Router>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            user?.role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : user?.role === "teacher" ? (
              <Navigate to="/teacher/dashboard" />
            ) : (
              <MainLayout>
                <Home />
              </MainLayout>
            )
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* COURSES */}
        <Route
          path="/courses"
          element={
            user ? (
              <MainLayout>
                <Courses />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* COURSE DETAIL */}
        <Route
          path="/courses/:id"
          element={
            user ? (
              <MainLayout>
                <CourseDetail />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* COURSE TEACHERS */}
        <Route
          path="/courses/:id/teachers"
          element={
            user ? (
              <MainLayout>
                <CourseTeachers />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔥 ALL TEACHERS PAGE */}
        <Route
          path="/teachers"
          element={
            user ? (
              <MainLayout>
                <Teachers />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔥 TEACHER PROFILE */}
        <Route
          path="/teacher/:id"
          element={
            user ? (
              <MainLayout>
                <TeacherProfile />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* TEACHER */}
        <Route
          path="/teacher/dashboard"
          element={
            user?.role === "teacher" ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </Router>
  );
};

export default App;