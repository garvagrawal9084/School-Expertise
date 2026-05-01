import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1", // adjust if needed
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // ❌ DO NOT refresh for auth routes
    if (
      original.url.includes("/login") ||
      original.url.includes("/signup")
    ) {
      return Promise.reject(error);
    }

    // prevent infinite loop
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        await API.post("/users/refresh-token");
        return API(original);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;