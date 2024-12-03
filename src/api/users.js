// src/api/users.js
import apiClient from './api';
import { toFormData } from './api';

export async function registerUser(userData) {
  return await apiClient.post('/api/users/register', userData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function loginUser(credentials) {
  const formData = toFormData(credentials);
  return await apiClient.post('/api/users/login', formData);
}

export async function getUserProfile() {
  return await apiClient.get('/api/users/profile');
}

export async function updateUserSettings(settings) {
  const formData = toFormData(settings);
  return await apiClient.put('/api/users/settings', formData);
}

