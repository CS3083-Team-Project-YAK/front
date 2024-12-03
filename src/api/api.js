// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // 替换为实际的API URL
  withCredentials: true, // 如果需要携带凭据
});

if (localStorage.getItem('authToken')) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
}

// 设置响应拦截器
apiClient.interceptors.response.use(
  response => { return response; }, 
  error => {
    if (error.response && error.response.status === 403) {
       console.error('403 Forbidden - Access Denied');
       window.location.href = '/login';
    }
    return Promise.reject(error); 
  }
);

export const toFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
      formData.append(key, data[key]);
  }
  return formData;
}

export default apiClient;

