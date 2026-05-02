import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";


import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseTeachers from "./pages/CourseTeachers";
import TeacherProfile from "./pages/TeacherProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import AdminDashboard from "./pages/admin/Dashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import AssignTeacher from "./pages/admin/AssignTeacher";
import TeacherRequests from "./pages/admin/TeacherRequests";
import Teachers from "./pages/admin/Teachers";


import TeacherDashboard from "./pages/teacher/TeacherDashboard";


const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <div className="spinner" />
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading...</p>
    </div>
  </div>
);

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Routes>

        {}
        <Route
          path="/"
          element={
            user?.role === "ADMIN" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <MainLayout>
                <Home />
              </MainLayout>
            )
          }
        />

        {}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {}
        <Route
          path="/courses"
          element={
            <MainLayout>
              <Courses />
            </MainLayout>
          }
        />

        {}
        <Route
          path="/courses/:id"
          element={
            <MainLayout>
              <CourseDetail />
            </MainLayout>
          }
        />

        {}
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

        {}
        <Route
          path="/teacher/:id"
          element={
            <MainLayout>
              <TeacherProfile />
            </MainLayout>
          }
        />

        {}
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "ADMIN" ? (
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/courses"
          element={
            user?.role === "ADMIN" ? (
              <AdminLayout>
                <ManageCourses />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/add-course"
          element={
            user?.role === "ADMIN" ? (
              <AdminLayout>
                <AddCourse />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/edit-course/:id"
          element={
            user?.role === "ADMIN" ? (
              <AdminLayout>
                <EditCourse />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/assign/:courseId"
          element={
            user?.role === "ADMIN" ? (
              <AdminLayout>
                <AssignTeacher />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/teacher-requests"
          element={
            user?.role === "ADMIN" ? (
              <AdminLayout>
                <TeacherRequests />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/teachers"
          element={
            user?.role === "ADMIN" ? (
              <AdminLayout>
                <Teachers />
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {}
        <Route
          path="/teacher/dashboard"
          element={
            user?.role === "TEACHER" ? (
              <MainLayout>
                <TeacherDashboard />
              </MainLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default App;