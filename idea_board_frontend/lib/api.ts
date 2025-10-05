import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ← ${response.config.url}`);
    return response;
  },
  (error) => {
    // Handle and log errors
    if (error.response) {
      console.error(`[Response Error] ${error.response.status}:`, error.response.data);
    } else {
      console.error('[Network/Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;