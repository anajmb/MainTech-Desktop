import axios from "axios";

const api = axios.create({
  baseURL: "https://maintech-backend-r6yk.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("DEBUG api request - token present:", !!token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api };
export default api;