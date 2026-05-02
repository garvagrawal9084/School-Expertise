import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api";


export const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  
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