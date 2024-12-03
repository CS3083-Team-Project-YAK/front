import apiClient from "./api";

export const getLeagues = () => apiClient.get("/api/leagues/");
export const createLeague = (data) => apiClient.post("/api/leagues/", data, {
    headers: {
        "Content-Type": "application/json",
    },
});
export const updateLeague = (id, data) => apiClient.put(`/api/leagues/${id}`, data, {
    headers: {
        "Content-Type": "application/json",
    },
});
export const deleteLeague = (id) => apiClient.delete(`/api/leagues/${id}`);
