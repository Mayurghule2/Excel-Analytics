import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');

  if (config.requiresAuth && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (config.contentType) {
    config.headers['Content-Type'] = config.contentType;
  }

  return config;
}, (error) => Promise.reject(error));


export const loginUser = (credentials) =>
  api.post('/auth/login', credentials);

export const registerUser = (data) =>
  api.post('/auth/register', data);


export const sendOtp = (email) =>
  api.post('/auth/send-otp', { email });

export const verifyOtp = (email, otp) =>
  api.post('/auth/verify-otp', { email, otp });

export const resetPassword = (email, newPassword) =>
  api.post('/auth/reset-password', { email, newPassword });

export const fetchDashboardStats = () =>
  api.get('/admin/stats', {
    requiresAuth: true,
  });

export const fetchUploadInsights = () =>
  api.get('/admin/uploads/insights', {
    requiresAuth: true,
  });

export const fetchUploadHistory = () =>
  api.get('/admin/uploads', {
    requiresAuth: true,
  });

export const fetchChartData = (type) =>
  api.get(`/admin/uploads/graph/${type}`, {
    requiresAuth: true,
    headers: { 'Cache-Control': 'no-cache' },
  });

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

export const generateInsights = (tableData) =>
  api.post('/ai/generate-insights', { tableData }, {
    requiresAuth: true, 
    contentType: 'application/json',
  });