// src/api/users.js
import apiClient from './api';

export async function registerUser(userData) {
  return await apiClient.post('/api/users/register', userData);
}

export async function loginUser(credentials) {
  return await apiClient.post('/api/users/login', credentials);
}

export async function getUserProfile() {
  return await apiClient.get('/api/users/profile');
}

export async function updateUserSettings(settings) {
  return await apiClient.put('/api/users/settings', settings);
}

