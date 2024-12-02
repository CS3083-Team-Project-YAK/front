// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://your-api-base-url', // 替换为实际的API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 如果需要携带凭据
});

export default apiClient;

