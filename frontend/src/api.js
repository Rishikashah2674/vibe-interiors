import axios from "axios";

// VITE_API_URL represents the backend root URL (e.g. http://localhost:5000 or https://vibe-interiors-backend.onrender.com)
const rawBackendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Ensure trailing slash and unnecessary /api path suffixes are cleanly removed from the root backend URL
export const BACKEND_URL = rawBackendUrl.replace(/\/+$/, "").replace(/\/api$/, "");

// API base URL always appends /api to the backend root URL
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Helper function to resolve relative image upload paths against the backend root URL
export const getImageUrl = (path) => {
  if (!path) return "";
  if (typeof path === "string" && path.startsWith("/uploads/")) {
    return `${BACKEND_URL}${path}`;
  }
  return path;
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to automatically add the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and user info from localStorage on authentication failure
      localStorage.removeItem("token");
      localStorage.removeItem("adminUser");
      
      // Redirect to login page if we are in the admin dashboard area
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
