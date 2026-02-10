import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://task-manager-dashboard-backend-ge9o.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
