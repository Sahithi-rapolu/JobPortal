// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Helper to handle responses
const handleResponse = (response) => response.data;
const handleError = (error) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  throw new Error(message);
};

// ==================== AUTH API ====================
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const data = handleResponse(response);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const data = handleResponse(response);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await apiClient.put(`/auth/reset-password/${token}`, { password });
      const data = handleResponse(response);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/auth/update-profile', userData);
      const data = handleResponse(response);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
};

// ==================== JOB API ====================
export const jobAPI = {
  getJobs: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiClient.get(`/jobs?${params}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getJob: async (id) => {
    try {
      const response = await apiClient.get(`/jobs/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createJob: async (jobData) => {
    try {
      const response = await apiClient.post('/jobs', jobData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateJob: async (id, jobData) => {
    try {
      const response = await apiClient.put(`/jobs/${id}`, jobData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  deleteJob: async (id) => {
    try {
      const response = await apiClient.delete(`/jobs/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getRecruiterJobs: async () => {
    try {
      const response = await apiClient.get('/jobs/recruiter/my-jobs');
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getStudentAppliedJobs: async () => {
    try {
      const response = await apiClient.get('/jobs/student/applied');
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
};

// ==================== APPLICATION API ====================
export const applicationAPI = {
  applyJob: async (jobId, formData) => {
    try {
      const response = await apiClient.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getMyApplications: async () => {
    try {
      const response = await apiClient.get('/applications/my-applications');
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getJobApplications: async (jobId) => {
    try {
      const response = await apiClient.get(`/applications/job/${jobId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateApplicationStatus: async (applicationId, status, recruiterNotes = '') => {
    try {
      const response = await apiClient.put(`/applications/${applicationId}/status`, {
        status,
        recruiterNotes,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  withdrawApplication: async (applicationId) => {
    try {
      const response = await apiClient.delete(`/applications/${applicationId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
};

// ==================== USER API ====================
export const userAPI = {
  getUser: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      const data = handleResponse(response);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  getRecruiterStats: async () => {
    try {
      const response = await apiClient.get('/users/recruiter/stats');
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getStudentStats: async () => {
    try {
      const response = await apiClient.get('/users/student/stats');
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
};

// Export all as default
const api = {
  auth: authAPI,
  jobs: jobAPI,
  applications: applicationAPI,
  users: userAPI
};

export default api;