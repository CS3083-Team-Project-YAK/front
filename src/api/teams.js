import apiClient from "./api";

// Get all teams
export const getTeams = () =>
  apiClient.get("/api/teams/all/");

// Get all players in a team
export const getTeamPlayers = (teamId) =>
  apiClient.get(`/api/teams/${teamId}/players/`);

// Add a player to a team
export const addPlayerToTeam = (teamId, playerId) =>
  apiClient.post(`/api/teams/${teamId}/players/`, null, {
    params: { player_id: playerId },
  });

// Remove a player from a team
export const removePlayerFromTeam = (teamId, playerId) =>
  apiClient.delete(`/api/teams/${teamId}/players/${playerId}`);

// Create a new team
export const createTeam = async (data) => {
  try {
    // 打印请求数据以便调试
    console.log('Creating team with data:', {
      name: data.name,
      owner: parseInt(data.owner),
      leagueID: parseInt(data.league),
      status: data.status
    });

    const response = await apiClient.post("/api/teams/", {
      name: data.name,
      owner: parseInt(data.owner),
      leagueID: parseInt(data.league),
      status: data.status
    }, {
      headers: { 
        "Content-Type": "application/json",
        // 确保包含认证token
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    
    return response;
  } catch (error) {
    console.error('Team creation error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 500) {
      throw new Error('Server error: Please try again later or contact support');
    }
    throw error;
  }
};

// Update an existing team
export const updateTeam = async (teamId, data) => {
  try {
    const response = await apiClient.put(`/api/teams/${teamId}`, {
      name: data.name,
      owner: parseInt(data.owner),
      leagueID: parseInt(data.league),
      status: data.status
    }, {
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    
    return response;
  } catch (error) {
    console.error('Team update error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};

// Delete a team
export const deleteTeam = (teamId) =>
  apiClient.delete(`/api/teams/${teamId}`);
