import { createContext, useContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Custom hook (clean usage everywhere)
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage (or backend later)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Role helpers (VERY IMPORTANT for your project)
  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin,
        isTeacher,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};