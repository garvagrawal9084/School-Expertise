import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api";

// Create Context
export const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: try to fetch user from backend using cookies
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        // Cookies invalid or expired — clear everything
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function — call after successful login API
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function — calls API to clear server cookies
  const logout = async () => {
    try {
      await API.post("/users/logout");
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // Role helpers
  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";
  const isStudent = user?.role === "STUDENT";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isTeacher,
        isStudent,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};