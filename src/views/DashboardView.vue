<!-- src/views/Dashboard.vue -->
<template>
	<div>
	  <!-- 主内容区域 -->
	  <div class="main-content">
		<div class="header">
		  <select class="league-dropdown">
			<option value="league1">League 1</option>
			<option value="league2">League 2</option>
			<option value="league3">League 3</option>
		  </select>
		  <button class="new-button" @click="showNewModal">
			New <i class="fas fa-plus-circle"></i>
		  </button>
		</div>
  
		<div id="dashboard">
		  <!-- Live League Overview -->
		  <div class="content-block">
			<h2>Live League Overview</h2>
			<button class="view-all-button" @click="$router.push('/leagues')">View All</button>
			<table class="dashboard-table">
			  <thead>
				<tr>
				  <th>League Name</th>
				  <th>Type</th>
				  <th>Commissioner</th>
				  <th>Max Teams</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="league in leagues" :key="league.name">
				  <td>{{ league.name }}</td>
				  <td>{{ league.type }}</td>
				  <td>{{ league.commissioner }}</td>
				  <td>{{ league.maxTeams }}</td>
				</tr>
			  </tbody>
			</table>
		  </div>
  
		  <!-- Teams Summary -->
		  <div class="content-block">
			<h2>Teams Summary</h2>
			<p>Total Number of Teams: {{ totalTeams }}</p>
			<p>Active Teams: {{ activeTeams }}</p>
			<p>Inactive Teams: {{ inactiveTeams }}</p>
			<button class="view-all-button" @click="$router.push('/teams')">View All</button>
			<table class="dashboard-table">
			  <thead>
				<tr>
				  <th>Team Name</th>
				  <th>Owner</th>
				  <th>League</th>
				  <th>Points</th>
				  <th>Ranking</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="team in teams" :key="team.name">
				  <td>{{ team.name }}</td>
				  <td>{{ team.owner }}</td>
				  <td>{{ team.league }}</td>
				  <td>{{ team.points }}</td>
				  <td>{{ team.ranking }}</td>
				</tr>
			  </tbody>
			</table>
		  </div>
  
		  <!-- Top Players -->
		  <div class="content-block">
			<h2>Top Players</h2>
			<button class="view-all-button" @click="$router.push('/players')">View All</button>
			<table class="dashboard-table">
			  <thead>
				<tr>
				  <th>Player Name</th>
				  <th>Sport</th>
				  <th>Position</th>
				  <th>Fantasy Points</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="player in players" :key="player.name">
				  <td>{{ player.name }}</td>
				  <td>{{ player.sport }}</td>
				  <td>{{ player.position }}</td>
				  <td>{{ player.points }}</td>
				</tr>
			  </tbody>
			</table>
		  </div>
  
		  <!-- Upcoming Matches -->
		  <div class="content-block">
			<h2>Upcoming Matches</h2>
			<button class="view-all-button" @click="$router.push('/matches')">View All</button>
			<table class="dashboard-table">
			  <thead>
				<tr>
				  <th>Match</th>
				  <th>Date</th>
				  <th>Status</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="match in matches" :key="match.id">
				  <td>{{ match.teams }}</td>
				  <td>{{ match.date }}</td>
				  <td>{{ match.status }}</td>
				</tr>
			  </tbody>
			</table>
		  </div>
		</div>
	  </div>
  
	  <!-- 新建记录模态框 -->
	  <div id="newModal" class="modal" v-if="showModal" @click.self="closeModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeModal">&times;</span>
			<h2>Add New Record</h2>
		  </div>
		  <div class="modal-body">
			<select v-model="selectedEntity" @change="onEntityChange">
			  <option value="team">Team</option>
			  <option value="player">Player</option>
			  <option value="match">Match</option>
			  <option value="league">League</option>
			</select>
			<div id="formContainer">
			  <!-- 根据 selectedEntity 动态渲染表单 -->
			  <component :is="currentFormComponent" ref="entityForm"></component>
			</div>
			<button @click="addEntity">Add</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  // 引入需要的子组件
  import TeamForm from '@/components/TeamForm.vue';
  import PlayerForm from '@/components/PlayerForm.vue';
  import MatchForm from '@/components/MatchForm.vue';
  import LeagueForm from '@/components/LeagueForm.vue';
  
  export default {
	name: 'DashboardView',
	data() {
	  return {
		showModal: false,
		selectedEntity: 'team',
		leagues: [
		  { name: 'League 1', type: 'Public', commissioner: 'User123', maxTeams: 10 },
		  { name: 'League 2', type: 'Private', commissioner: 'User456', maxTeams: 8 },
		  { name: 'League 3', type: 'Public', commissioner: 'User789', maxTeams: 12 },
		],
		teams: [
		  { name: 'Team A', owner: 'User123', league: 'League 1', points: 1500, ranking: 1 },
		  { name: 'Team B', owner: 'User456', league: 'League 2', points: 1200, ranking: 3 },
		],
		players: [
		  { name: 'Player 1', sport: 'Soccer', position: 'Forward', points: 200 },
		  { name: 'Player 2', sport: 'Basketball', position: 'Guard', points: 350 },
		],
		matches: [
		  { id: 1, teams: 'Team A vs Team B', date: '2024-10-15', status: 'Scheduled' },
		  { id: 2, teams: 'Team C vs Team A', date: '2024-10-20', status: 'Scheduled' },
		],
	  };
	},
	computed: {
	  totalTeams() {
		return this.teams.length;
	  },
	  activeTeams() {
		// 示例数据中没有团队状态，假设全部为活跃
		return this.teams.length;
	  },
	  inactiveTeams() {
		return 0;
	  },
	  currentFormComponent() {
		switch (this.selectedEntity) {
		  case 'team':
			return 'TeamForm';
		  case 'player':
			return 'PlayerForm';
		  case 'match':
			return 'MatchForm';
		  case 'league':
			return 'LeagueForm';
		  default:
			return 'div';
		}
	  },
	},
	methods: {
	  showNewModal() {
		this.showModal = true;
	  },
	  closeModal() {
		this.showModal = false;
	  },
	  onEntityChange() {
		// 处理实体类型切换时的逻辑
	  },
	  addEntity() {
		// 添加新实体的逻辑，根据 selectedEntity 处理不同的情况
		const formComponent = this.$refs.entityForm;
		let newEntityData = {};
  
		if (formComponent && formComponent.getTeamData) {
		  newEntityData = formComponent.getTeamData();
		} else if (formComponent && formComponent.getPlayerData) {
		  newEntityData = formComponent.getPlayerData();
		} else if (formComponent && formComponent.getMatchData) {
		  newEntityData = formComponent.getMatchData();
		} else if (formComponent && formComponent.getLeagueData) {
		  newEntityData = formComponent.getLeagueData();
		}
  
		// 根据 selectedEntity 将新数据添加到对应的数组中
		if (this.selectedEntity === 'team') {
		  this.teams.push({ ...newEntityData, ranking: this.teams.length + 1 });
		} else if (this.selectedEntity === 'player') {
		  this.players.push(newEntityData);
		} else if (this.selectedEntity === 'match') {
		  this.matches.push({ ...newEntityData, id: this.matches.length + 1 });
		} else if (this.selectedEntity === 'league') {
		  this.leagues.push(newEntityData);
		}
  
		alert(`Added new ${this.selectedEntity}!`);
		this.closeModal();
	  },
	},
	components: {
	  TeamForm,
	  PlayerForm,
	  MatchForm,
	  LeagueForm,
	},
  };
  </script>
  
  <style scoped>
  /* 将全局样式移至 styles.css，这里仅保留特定样式 */
  </style>
  