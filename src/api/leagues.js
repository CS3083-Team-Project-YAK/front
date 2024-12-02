// src/api/leagues.js
import apiClient from './api';

export const createLeague = (leagueData) => apiClient.post('/api/leagues/', leagueData);
export const getLeagues = () => apiClient.get('/api/leagues/');
export const updateLeague = (id, leagueData) => apiClient.put(`/api/leagues/${id}`, leagueData);
export const deleteLeague = (id) => apiClient.delete(`/api/leagues/${id}`);
