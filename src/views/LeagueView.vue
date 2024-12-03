<template>
	<div class="main-content">
	  <div class="content-block">
		<h2>Active Leagues</h2>
		<button @click="showCreateLeagueModal">Create League</button>
		<table class="leagues-table">
		  <thead>
			<tr>
			  <th>League Name</th>
			  <th>Type</th>
			  <th>Commissioner</th>
			  <th>Max Teams</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="league in activeLeagues" :key="league.leagueID">
			  <td>{{ league.league_name }}</td>
			  <td>{{ league.league_type }}</td>
			  <td>{{ league.commissioner }}</td>
			  <td>{{ league.max_teams }}</td>
			  <td>
				<button @click="editLeague(league)">Edit</button>
				<button @click="deleteLeague(league.leagueID)">Delete</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  
	  <!-- 创建或编辑联盟的模态框 -->
	  <div v-if="showEditModal" class="modal">
		<div class="modal-content">
		  <h2>{{ isEditing ? 'Edit League' : 'Create League' }}</h2>
		  <label>League Name</label>
		  <input v-model="editLeagueData.league_name" placeholder="Enter league name" />
		  <label>League Type</label>
		  <select v-model="editLeagueData.league_type">
			<option value="P">Public</option>
			<option value="R">Private</option>
		  </select>
		  <label v-show="isEditing">Commissioner</label>
		  <input v-model="editLeagueData.commissioner" v-show="isEditing" placeholder="Enter commissioner ID" />
		  <label>Max Teams</label>
		  <input v-model="editLeagueData.max_teams" type="number" placeholder="Enter max teams" />
		  <label>Draft Date</label>
		  <input v-model="editLeagueData.draft_date" type="date" />
		  <button @click="saveChanges">{{ isEditing ? 'Save Changes' : 'Create League' }}</button>
		  <button @click="closeEditModal">Cancel</button>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import { getLeagues, createLeague, updateLeague, deleteLeague } from "@/api/leagues";
  
  export default {
	name: "LeagueView",
	data() {
	  return {
		activeLeagues: [],
		showEditModal: false,
		isEditing: false,
		editLeagueData: {
		  league_name: "",
		  league_type: "P",
		  commissioner: "",
		  max_teams: 10,
		  draft_date: "",
		},
	  };
	},
	methods: {
	  async fetchLeagues() {
		try {
		  const response = await getLeagues();
		  this.activeLeagues = response.data;
		} catch (error) {
		  console.error("Error fetching leagues:", error);
		}
	  },
	  showCreateLeagueModal() {
		this.isEditing = false;
		this.editLeagueData = {
		  league_name: "",
		  league_type: "Public",
		  commissioner: "",
		  max_teams: 10,
		  draft_date: "",
		};
		this.showEditModal = true;
	  },
	  editLeague(league) {
		this.isEditing = true;
		this.editLeagueData = { ...league };
		this.showEditModal = true;
	  },
	  closeEditModal() {
		this.showEditModal = false;
	  },
	  async saveChanges() {
		try {
		  if (this.isEditing) {
			await updateLeague(this.editLeagueData.leagueID, this.editLeagueData);
			alert("League updated successfully!");
		  } else {
			await createLeague(this.editLeagueData);
			alert("League created successfully!");
		  }
		  this.fetchLeagues();
		  this.closeEditModal();
		} catch (error) {
		  console.error("Error saving league:", error);
		  alert("An error occurred while saving the league.");
		}
	  },
	  async deleteLeague(leagueID) {
		try {
		  await deleteLeague(leagueID);
		  alert("League deleted successfully!");
		  this.fetchLeagues();
		} catch (error) {
		  console.error("Error deleting league:", error);
		  alert("An error occurred while deleting the league.");
		}
	  },
	},
	mounted() {
	  this.fetchLeagues();
	},
  };
  </script>
  
  <style scoped>
  /* 样式可根据需求调整 */
  .modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
	background: white;
	padding: 20px;
	border-radius: 8px;
	width: 400px;
	text-align: center;
  }
  </style>
  