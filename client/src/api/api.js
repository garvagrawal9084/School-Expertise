import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1", // adjust if needed
  withCredentials: true,
});

let isRefreshing = false;

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/login") &&
      !originalRequest.url.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        await API.post("/users/refresh-token");
        return API(originalRequest);
      } catch (refreshError) {
        // 🔥 STOP LOOP HERE
        console.error("Refresh failed, logging out");

        localStorage.removeItem("user");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default API;