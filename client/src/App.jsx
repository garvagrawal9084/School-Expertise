import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// LAYOUTS
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

// PUBLIC PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseTeachers from "./pages/CourseTeachers";

// ADMIN PAGES
import Dashboard from "./pages/admin/Dashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import TeacherRequests from "./pages/admin/TeacherRequests";
import AddCourse from "./pages/admin/AddCourse";
import AssignTeacher from "./pages/admin/AssignTeacher";

// TEACHER PAGE
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherProfile from "./pages/TeacherProfile";

// ROUTE PROTECTION
import AdminRoute from "./routes/AdminRoute";
import TeacherRoute from "./routes/TeacherRoute";

function App() {
  return (
    <Router>
      {/* TOASTER */}
      <Toaster position="top-right" />

      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/teachers" element={<CourseTeachers />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= ADMIN ================= */}
        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/teacher-requests" element={<TeacherRequests />} />
          <Route path="/admin/assign/:courseId" element={<AssignTeacher />} />
        </Route>

        {/* ================= TEACHER ================= */}
        <Route
          element={
            <TeacherRoute>
              <MainLayout />
            </TeacherRoute>
          }
        >
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Route>

        {/* ================= REDIRECT ================= */}
        <Route path="/admin/dashboard" element={<Navigate to="/admin" />} />

      </Routes>
    </Router>
  );
}

export default App;