<!-- src/views/Teams.vue -->
<template>
	<div class="main-content">
	  <div class="content-block">
		<h2>Teams List</h2>
		<button class="create-button" @click="showCreateTeamModal">Create New Team</button>
		<table class="teams-table">
		  <thead>
			<tr>
			  <th>Team Name</th>
			  <th>Owner</th>
			  <th>League</th>
			  <th>Status</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="team in teams" :key="team.name">
			  <td>{{ team.name }}</td>
			  <td>{{ team.owner }}</td>
			  <td>{{ team.league }}</td>
			  <td>{{ team.status }}</td>
			  <td>
				<button class="edit-button" @click="editTeam(team)">Edit</button>
				<button class="delete-button" @click="deleteTeam(team)">Delete</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  
	  <!-- 创建团队模态框 -->
	  <div id="createTeamModal" class="modal" v-if="showCreateModal" @click.self="closeCreateModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeCreateModal">&times;</span>
			<h2>Create New Team</h2>
		  </div>
		  <div class="modal-body">
			<TeamForm ref="teamForm" />
			<button @click="createTeam">Create Team</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 编辑团队模态框 -->
	  <div id="editTeamModal" class="modal" v-if="showEditModal" @click.self="closeEditModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditModal">&times;</span>
			<h2>Edit Team</h2>
		  </div>
		  <div class="modal-body">
			<input type="text" v-model="currentTeam.name" placeholder="Team Name" required>
			<input type="text" v-model="currentTeam.owner" placeholder="Owner (User ID)" required>
			<input type="text" v-model="currentTeam.league" placeholder="League ID" required>
			<select v-model="currentTeam.status">
			  <option value="active">Active</option>
			  <option value="inactive">Inactive</option>
			</select>
			<button @click="saveTeamChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import TeamForm from '@/components/TeamForm.vue';
  
  export default {
	name: 'TeamView',
	components: {
	  TeamForm,
	},
	data() {
	  return {
		teams: [
		  { name: 'Team A', owner: 'User123', league: 'League 1', status: 'active' },
		  { name: 'Team B', owner: 'User456', league: 'League 2', status: 'inactive' },
		],
		showCreateModal: false,
		showEditModal: false,
		currentTeam: {},
	  };
	},
	methods: {
	  showCreateTeamModal() {
		this.showCreateModal = true;
	  },
	  closeCreateModal() {
		this.showCreateModal = false;
	  },
	  createTeam() {
		const teamData = this.$refs.teamForm.getTeamData();
		this.teams.push(teamData);
		this.closeCreateModal();
	  },
	  editTeam(team) {
		this.currentTeam = { ...team };
		this.showEditModal = true;
	  },
	  closeEditModal() {
		this.showEditModal = false;
	  },
	  saveTeamChanges() {
		const index = this.teams.findIndex(t => t.name === this.currentTeam.name);
		if (index !== -1) {
		  this.$set(this.teams, index, this.currentTeam);
		}
		this.closeEditModal();
	  },
	  deleteTeam(team) {
		if (confirm(`Are you sure you want to delete ${team.name}?`)) {
		  this.teams = this.teams.filter(t => t.name !== team.name);
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  /* 样式已在全局 styles.css 中定义，这里可添加特定样式 */
  </style>
  