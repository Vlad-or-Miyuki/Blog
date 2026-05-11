import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  return `${API_URL}/${encodeURI(imagePath.replace(/^\/+/, ""))}`;
};

const instance = axios.create({
  baseURL: `${API_URL}/api`,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
