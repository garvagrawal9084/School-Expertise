import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedTeacherRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "TEACHER") return <Navigate to="/" />;

  return children;
};

export default ProtectedTeacherRoute;