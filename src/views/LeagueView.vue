<template>
	<div class="main-content">
	  <div class="content-block">
		<h2>Active Leagues</h2>
		<button class="create-button" @click="openNewLeagueModal">Add New League</button>
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
			<tr v-for="league in activeLeagues" :key="league.id">
			  <td>{{ league.name }}</td>
			  <td>{{ league.type }}</td>
			  <td>{{ league.commissioner }}</td>
			  <td>{{ league.maxTeams }}</td>
			  <td>
				<button class="edit-button" @click="editLeague(league)">Edit</button>
				<button class="delete-button" @click="deleteLeague(league, true)">Delete</button>
				<button class="archive-button" @click="archiveLeague(league)">Archive</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  
	  <div class="content-block">
		<h2>Archived Leagues</h2>
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
			<tr v-for="league in archivedLeagues" :key="league.id">
			  <td>{{ league.name }}</td>
			  <td>{{ league.type }}</td>
			  <td>{{ league.commissioner }}</td>
			  <td>{{ league.maxTeams }}</td>
			  <td>
				<button class="edit-button" @click="editLeague(league)">Edit</button>
				<button class="delete-button" @click="deleteLeague(league, false)">Delete</button>
				<button class="archive-button" @click="activateLeague(league)">Activate</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  
	  <!-- 编辑模态框 -->
	  <div id="editModal" class="modal" v-if="showEditModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditModal">&times;</span>
			<h2>{{ editLeagueData.id ? 'Edit League' : 'Add New League' }}</h2>
		  </div>
		  <div class="modal-body">
			<label for="leagueNameInput">League Name</label>
			<input type="text" id="leagueNameInput" v-model="editLeagueData.name" placeholder="League Name" required>
  
			<label>Type</label>
			<div>
			  <input type="radio" id="public" value="Public" v-model="editLeagueData.type" required>
			  <label for="public">Public</label>
			  <input type="radio" id="private" value="Private" v-model="editLeagueData.type" required>
			  <label for="private">Private</label>
			</div>
  
			<label for="commissionerInput">Commissioner (User ID)</label>
			<input type="text" id="commissionerInput" v-model="editLeagueData.commissioner" placeholder="Commissioner" required>
  
			<label for="maxTeamsInput">Max Teams</label>
			<input type="number" id="maxTeamsInput" v-model="editLeagueData.maxTeams" placeholder="Max Teams" required>
  
			<button @click="saveChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import { getLeagues, createLeague, updateLeague, deleteLeague } from '@/api/leagues';
  
  export default {
	name: 'LeagueView',
	data() {
	  return {
		activeLeagues: [],
		archivedLeagues: [],
		showEditModal: false,
		editLeagueData: {
		  id: null,
		  name: '',
		  type: '',
		  commissioner: '',
		  maxTeams: null,
		},
	  };
	},
	mounted() {
	  this.fetchLeagues();
	},
	methods: {
	  async fetchLeagues() {
		try {
		  const response = await getLeagues();
		  this.activeLeagues = response.data.active || [];
		  this.archivedLeagues = response.data.archived || [];
		} catch (error) {
		  console.error('加载联赛数据失败:', error);
		}
	  },
	  openNewLeagueModal() {
		this.editLeagueData = {
		  id: null,
		  name: '',
		  type: '',
		  commissioner: '',
		  maxTeams: null,
		};
		this.showEditModal = true;
	  },
	  editLeague(league) {
		this.editLeagueData = { ...league };
		this.showEditModal = true;
	  },
	  closeEditModal() {
		this.showEditModal = false;
	  },
	  async saveChanges() {
		try {
		  if (this.editLeagueData.id) {
			await updateLeague(this.editLeagueData.id, this.editLeagueData);
		  } else {
			await createLeague(this.editLeagueData);
		  }
		  this.fetchLeagues();
		  this.showEditModal = false;
		} catch (error) {
		  console.error('保存联赛失败:', error);
		}
	  },
	  async deleteLeague(league) {
		try {
		  await deleteLeague(league.id);
		  this.fetchLeagues();
		} catch (error) {
		  console.error('删除联赛失败:', error);
		}
	  },
	  async archiveLeague(league) {
		try {
		  league.isArchived = true;
		  await updateLeague(league.id, league);
		  this.fetchLeagues();
		} catch (error) {
		  console.error('归档联赛失败:', error);
		}
	  },
	  async activateLeague(league) {
		try {
		  league.isArchived = false;
		  await updateLeague(league.id, league);
		  this.fetchLeagues();
		} catch (error) {
		  console.error('激活联赛失败:', error);
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  /* 样式已在全局 styles.css 中定义 */
  </style>
  