<!-- src/views/Players.vue -->
<template>
	<div class="main-content">
	  <div class="content-block">
		<h2>Players List</h2>
		<button class="create-button" @click="showCreatePlayerModal">Add New Player</button>
		<table class="players-table">
		  <thead>
			<tr>
			  <th>Player Name</th>
			  <th>Sport</th>
			  <th>Position</th>
			  <th>Fantasy Points</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="player in players" :key="player.name">
			  <td>{{ player.name }}</td>
			  <td>{{ player.sport }}</td>
			  <td>{{ player.position }}</td>
			  <td>{{ player.points }}</td>
			  <td>
				<button class="edit-button" @click="editPlayer(player)">Edit</button>
				<button class="delete-button" @click="deletePlayer(player)">Delete</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  
	  <!-- 创建球员模态框 -->
	  <div id="createPlayerModal" class="modal" v-if="showCreateModal" @click.self="closeCreateModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeCreateModal">&times;</span>
			<h2>Add New Player</h2>
		  </div>
		  <div class="modal-body">
			<PlayerForm ref="playerForm" />
			<button @click="createPlayer">Add Player</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 编辑球员模态框 -->
	  <div id="editPlayerModal" class="modal" v-if="showEditModal" @click.self="closeEditModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditModal">&times;</span>
			<h2>Edit Player</h2>
		  </div>
		  <div class="modal-body">
			<input type="text" v-model="currentPlayer.name" placeholder="Player Name" required>
			<input type="text" v-model="currentPlayer.sport" placeholder="Sport" required>
			<input type="text" v-model="currentPlayer.position" placeholder="Position" required>
			<input type="text" v-model="currentPlayer.team" placeholder="Real-Life Team" required>
			<input type="number" v-model="currentPlayer.points" placeholder="Fantasy Points" required>
			<button @click="savePlayerChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import PlayerForm from '@/components/PlayerForm.vue';
  
  export default {
	name: 'PlayerView',
	components: {
	  PlayerForm,
	},
	data() {
	  return {
		players: [
		  { name: 'Player 1', sport: 'Soccer', position: 'Forward', team: 'Team X', points: 200 },
		  { name: 'Player 2', sport: 'Basketball', position: 'Guard', team: 'Team Y', points: 350 },
		],
		showCreateModal: false,
		showEditModal: false,
		currentPlayer: {},
	  };
	},
	methods: {
	  showCreatePlayerModal() {
		this.showCreateModal = true;
	  },
	  closeCreateModal() {
		this.showCreateModal = false;
	  },
	  createPlayer() {
		const playerData = this.$refs.playerForm.getPlayerData();
		this.players.push(playerData);
		this.closeCreateModal();
	  },
	  editPlayer(player) {
		this.currentPlayer = { ...player };
		this.showEditModal = true;
	  },
	  closeEditModal() {
		this.showEditModal = false;
	  },
	  savePlayerChanges() {
		const index = this.players.findIndex(p => p.name === this.currentPlayer.name);
		if (index !== -1) {
		  this.$set(this.players, index, this.currentPlayer);
		}
		this.closeEditModal();
	  },
	  deletePlayer(player) {
		if (confirm(`Are you sure you want to delete ${player.name}?`)) {
		  this.players = this.players.filter(p => p.name !== player.name);
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  /* 样式已在全局 styles.css 中定义，这里可添加特定样式 */
  </style>
  