import apiClient from "./api";

// Get match details by match ID
export const getMatchDetails = (matchId) =>
  apiClient.get(`/api/matches/${matchId}`);

// Get all matches
export const getAllMatches = () =>
  apiClient.get(`/api/matches`);

// Create a new match
export const createMatch = (data) =>
  apiClient.post(`/api/matches`, data, {
    headers: { "Content-Type": "application/json" },
  });

// Update match results by match ID
export const updateMatchResults = (matchId, data) =>
  apiClient.post(`/api/matches/${matchId}/results`, data, {
    headers: { "Content-Type": "application/json" },
  });
