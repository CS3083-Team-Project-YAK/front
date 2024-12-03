import apiClient from "./api";

// Fetch available players in a league
export const getAvailablePlayers = async (params = {}) => {
  try {
    // 添加默认参数
    const defaultParams = {
      league_id: params.league_id || 1,  // 默认联盟ID
      status: params.status || 'A'  // 默认状态
    };

    const response = await apiClient.get("/api/players/", {
      params: defaultParams
    });
    
    console.log('API Request params:', defaultParams); // 调试用
    return response;
  } catch (error) {
    if (error.response?.status === 422) {
      console.error('API Error response:', error.response.data); // 调试用
    }
    throw error;
  }
};

// Create a new player
export const createPlayer = async (data) => {
  return await apiClient.post("/api/players/", data, {
    headers: {
        "Content-Type": "application/json",
    },
  });
};

// Update an existing player
export const updatePlayer = async (playerId, data) => {
  return await apiClient.put(`/api/players/${playerId}`, data);
};

// Fetch statistics for a specific player
export const getPlayerStatistics = (id) =>
  apiClient.get(`/api/players/${id}/statistics`);
