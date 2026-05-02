import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1", 
  withCredentials: true,
});

let isRefreshing = false;

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    
    const skipUrls = ["/login", "/refresh-token", "/users/me"];
    const shouldSkip = skipUrls.some((url) => originalRequest.url.includes(url));

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkip
    ) {
      originalRequest._retry = true;

      try {
        await API.post("/users/refresh-token");
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed, logging out");
        localStorage.removeItem("user");

        
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default API;