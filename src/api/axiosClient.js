import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Tu backend FastAPI

const axiosClient = axios.create({
  baseURL: API_URL,
});

// agregar token automáticamente
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
