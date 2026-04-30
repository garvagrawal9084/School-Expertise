import { Link } from "react-router-dom";

const RoleButtons = ({ user }) => {
  if (!user) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      {user.role === "ADMIN" && (
        <Link to="/admin/courses">
          <button>Admin Dashboard</button>
        </Link>
      )}

      {user.role === "TEACHER" && (
        <button>Teacher Dashboard</button>
      )}
    </div>
  );
};

export default RoleButtons;