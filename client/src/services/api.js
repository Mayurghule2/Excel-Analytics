// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Default backend URL
});

// Request interceptor to attach token or custom headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');

  // If flagged, add Authorization header
  if (config.requiresAuth && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // If flagged, add custom Content-Type
  if (config.contentType) {
    config.headers['Content-Type'] = config.contentType;
  }

  return config;
}, (error) => Promise.reject(error));

// === ✅ API FUNCTIONS ===

// LOGIN
export const loginUser = (credentials) =>
  api.post('/auth/login', credentials);

// REGISTER
export const registerUser = (data) =>
  api.post('/auth/register', data);

// STATS (admin only)
export const fetchDashboardStats = () =>
  api.get('/admin/stats', {
    requiresAuth: true,
  });

// INSIGHTS (admin only)
export const fetchUploadInsights = () =>
  api.get('/admin/uploads/insights', {
    requiresAuth: true,
  });

// UPLOAD HISTORY (admin only)
export const fetchUploadHistory = () =>
  api.get('/admin/uploads', {
    requiresAuth: true,
  });

// GRAPH DATA (admin only)
export const fetchChartData = (type) =>
  api.get(`/admin/uploads/graph/${type}`, {
    requiresAuth: true,
    headers: { 'Cache-Control': 'no-cache' },
  });

// CONTACT FORM (public, uses fetch not axios)
export const sendContactMessage = async (formData) => {
  try {
    const res = await axios.post('http://localhost:5000/api/contact', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Something went wrong');
  }
};

export const fetchContactMessages = () =>
  api.get('/admin/contact', {
    requiresAuth: true,
  });

// GET chart data by uploadId
export const getChartDataById = (uploadId) =>
  api.get(`/uploads/${uploadId}/chart-data`, {
    requiresAuth: true,
  });

  export const getUploadHistory = () => api.get('/uploads/user/uploads',{
    requiresAuth: true,
  });
export const deleteUploadById = (id) => api.delete(`/uploads/${id}`,{
  requiresAuth: true,
});

export const fetchAllUsers = () => api.get('/admin/users',{
  requiresAuth: true,
});

export const getUserDashboardData = () =>
  api.get('uploads/dashboard/user',{
  requiresAuth: true,
});
export const getChartsUploadHistory = () =>
  api.get('uploads/charts-data',{
  requiresAuth: true,
});
export const getUserProfile = (id) =>
  api.get(`users/${id}`,{
  requiresAuth: true,
});
export const putUserProfile = (id,formData) =>
  api.put(`users/update/${id}`,formData,{
  requiresAuth: true,
});

