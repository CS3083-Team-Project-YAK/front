<template>
	<div class="player-view">
	  <h1>Players Management</h1>
  
	  <div v-if="error" class="error-message">
		{{ error }}
	  </div>
  
	  <div class="content-block">
		<button @click="openCreateModal">Create New Player</button>
		<button @click="sortByFantasyPoints">
		  Sort by Fantasy Points ({{ sortOrder === 'asc' ? 'Ascending' : 'Descending' }})
		</button>
  
		<table class="players-table">
		  <thead>
			<tr>
			  <th>Full Name</th>
			  <th>Sport</th>
			  <th>Position</th>
			  <th>Team</th>
			  <th>Fantasy Points</th>
			  <th>Status</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="player in players" :key="player.playerID">
			  <td>{{ player.full_name }}</td>
			  <td>{{ player.sport }}</td>
			  <td>{{ player.position }}</td>
			  <td>{{ player.real_team }}</td>
			  <td>{{ player.fantasy_points }}</td>
			  <td>
				<span :class="['status-badge', player.availability_status]">
				  {{ player.availability_status }}
				</span>
			  </td>
			</tr>
		  </tbody>
		</table>
  
		<div v-if="players.length === 0 && !error" class="no-data">
		  <p>No players available.</p>
		</div>
	  </div>
  
	  <div v-if="showModal" class="modal">
		<PlayerForm
		  :initialPlayer="selectedPlayer"
		  :isEditMode="isEditMode"
		  @player-saved="handlePlayerSaved"
		  @close="closeModal"
		/>
	  </div>
	</div>
  </template>
  
  <script>
  import { getAvailablePlayers } from "@/api/players";
  import PlayerForm from "@/components/PlayerForm.vue";
  
  export default {
	components: { PlayerForm },
	data() {
	  return {
		players: [],
		error: null,
		currentLeagueId: 1,
		showModal: false,
		isEditMode: false,
		selectedPlayer: null,
		sortOrder: null, // 排序状态
	  };
	},
	methods: {
	  openCreateModal() {
		this.isEditMode = false;
		this.selectedPlayer = null;
		this.showModal = true;
	  },
	  closeModal() {
		this.showModal = false;
	  },
	  handlePlayerSaved() {
		this.closeModal();
		this.fetchPlayers();
	  },
	  async fetchPlayers() {
		try {
		  const token = localStorage.getItem("authToken");
		  if (!token) {
			this.error = "Please login to view players";
			this.$router.push("/login");
			return;
		  }
  
		  const response = await getAvailablePlayers({
			league_id: this.currentLeagueId,
			status: "A",
		  });
  
		  this.players = response.data;
		  this.error = null;
		} catch (error) {
		  console.error("Error fetching players:", error);
		  if (error.response?.status === 401) {
			this.error = "Session expired. Please login again.";
			localStorage.removeItem("authToken");
			this.$router.push("/login");
		  } else if (error.response?.status === 422) {
			const errorDetail =
			  error.response?.data?.detail ||
			  error.response?.data?.message ||
			  "Invalid request parameters";
			this.error = `Failed to load players: ${errorDetail}`;
		  } else {
			this.error = "Failed to load players. Please try again later.";
		  }
		}
	  },
	  checkAuth() {
		const token = localStorage.getItem("authToken");
		if (!token) {
		  this.error = "Please login to view players";
		  this.$router.push("/login");
		}
	  },
	  sortByFantasyPoints() {
		if (this.sortOrder === "asc") {
		  this.players.sort((a, b) => b.fantasy_points - a.fantasy_points);
		  this.sortOrder = "desc";
		} else {
		  this.players.sort((a, b) => a.fantasy_points - b.fantasy_points);
		  this.sortOrder = "asc";
		}
	  },
	},
	created() {
	  this.checkAuth();
	  if (!this.error) {
		this.fetchPlayers();
	  }
	},
  };
  </script>
  
  <style scoped>
  .player-view {
	margin-left: 130px;
	padding: 20px;
	min-height: 100vh;
	background-color: #f5f5f5;
	position: relative;
	z-index: 1;
	width: calc(100% - 250px);
	box-sizing: border-box;
  }
  
  .content-block {
	background: white;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .players-table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 20px;
	background: white;
  }
  
  .players-table th,
  .players-table td {
	padding: 12px 15px;
	text-align: left;
	border-bottom: 1px solid #ddd;
  }
  
  .players-table th {
	background-color: #f8f9fa;
	font-weight: 600;
	color: #495057;
  }
  
  .players-table tr:hover {
	background-color: #f5f5f5;
  }
  
  .status-badge {
	padding: 4px 8px;
	border-radius: 12px;
	font-size: 0.85em;
	font-weight: 500;
  }
  
  .status-badge.available {
	background-color: #e3fcef;
	color: #0a7b3d;
  }
  
  .status-badge.unavailable {
	background-color: #ffe5e5;
	color: #cf0000;
  }
  
  .status-badge.injured {
	background-color: #fff3cd;
	color: #856404;
  }
  
  .error-message {
	background-color: #fff3f3;
	color: #dc3545;
	padding: 10px;
	border-radius: 4px;
	margin-bottom: 20px;
	border: 1px solid #dc3545;
  }
  
  .no-data {
	text-align: center;
	padding: 20px;
	color: #666;
  }
  
  button {
	margin-right: 10px;
	padding: 8px 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
  }
  
  button:hover {
	background-color: #0056b3;
  }
  
  h1 {
	margin-bottom: 20px;
	color: #333;
  }
  
  @media (max-width: 768px) {
	.player-view {
	  margin-left: 0;
	  width: 100%;
	  padding: 10px;
	}
  
	.players-table {
	  display: block;
	  overflow-x: auto;
	}
  
	.players-table th,
	.players-table td {
	  min-width: 120px;
	}
  }
  </style>
  