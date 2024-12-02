<!-- src/views/Matches.vue -->
<template>
	<div class="main-content">
	  <!-- 比赛列表 -->
	  <div class="content-block">
		<h2>Matches List</h2>
		<button class="create-button" @click="showCreateMatchModal">Create New Match</button>
		<table class="matches-table">
		  <thead>
			<tr>
			  <th>Match ID</th>
			  <th>Teams</th>
			  <th>Date</th>
			  <th>Final Score</th>
			  <th>Winner</th>
			  <th>Status</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="match in matches" :key="match.id">
			  <td>{{ match.id }}</td>
			  <td>{{ match.teamA }} vs {{ match.teamB }}</td>
			  <td>{{ match.date }}</td>
			  <td>{{ match.score }}</td>
			  <td>{{ match.winner }}</td>
			  <td>{{ match.status }}</td>
			  <td>
				<button class="edit-button" @click="editMatch(match)">Edit</button>
				<button class="delete-button" @click="deleteMatch(match)">Delete</button>
				<button class="update-score-button" v-if="match.status !== 'Completed'" @click="showUpdateScoreModal(match)">Update Score</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	  <!-- 分页 -->
	  <div class="pagination">
		<button>&laquo; Prev</button>
		<button>1</button>
		<button>2</button>
		<button>3</button>
		<button>Next &raquo;</button>
	  </div>
	  <!-- 比赛事件列表 -->
	  <div class="content-block">
		<h2>Match Events</h2>
		<button class="add-event-button" @click="showAddEventModal">Add Match Event</button>
		<table class="events-table">
		  <thead>
			<tr>
			  <th>Event Type</th>
			  <th>Event Time</th>
			  <th>Involved Players</th>
			  <th>Impact on Fantasy Points</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="event in events" :key="event.id">
			  <td>{{ event.type }}</td>
			  <td>{{ event.time }}'</td>
			  <td>{{ event.player }}</td>
			  <td>{{ event.points }}</td>
			  <td>
				<button class="edit-button" @click="editEvent(event)">Edit</button>
				<button class="delete-button" @click="deleteEvent(event)">Delete</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	  <!-- 最近更新 -->
	  <div class="timeline">
		<h3>Recent Updates</h3>
		<div class="timeline-item" v-for="update in updates" :key="update.id">
		  <h4>{{ update.title }}</h4>
		  <p>{{ update.description }} ({{ update.date }})</p>
		</div>
	  </div>
  
	  <!-- 编辑比赛模态框 -->
	  <div id="editModal" class="modal" v-if="showEditModal" @click.self="closeEditModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditModal">&times;</span>
			<h2>Edit Match</h2>
		  </div>
		  <div class="modal-body">
			<label for="matchIdInput">Match ID</label>
			<input type="text" id="matchIdInput" v-model="currentMatch.id" required>
  
			<label for="teamAInput">Team A</label>
			<input type="text" id="teamAInput" v-model="currentMatch.teamA" required>
  
			<label for="teamBInput">Team B</label>
			<input type="text" id="teamBInput" v-model="currentMatch.teamB" required>
  
			<label for="dateInput">Match Date</label>
			<input type="date" id="dateInput" v-model="currentMatch.date" required>
  
			<label for="scoreInput">Final Score</label>
			<input type="text" id="scoreInput" v-model="currentMatch.score">
  
			<label for="winnerInput">Winner</label>
			<input type="text" id="winnerInput" v-model="currentMatch.winner">
  
			<label for="statusInput">Status</label>
			<select id="statusInput" v-model="currentMatch.status">
			  <option value="In Progress">In Progress</option>
			  <option value="Completed">Completed</option>
			</select>
  
			<button @click="saveMatchChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 创建比赛模态框 -->
	  <div id="createModal" class="modal" v-if="showCreateModal" @click.self="closeCreateModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeCreateModal">&times;</span>
			<h2>Create New Match</h2>
		  </div>
		  <div class="modal-body">
			<input type="text" v-model="newMatch.id" placeholder="Match ID" required>
			<input type="text" v-model="newMatch.teamA" placeholder="Team A" required>
			<input type="text" v-model="newMatch.teamB" placeholder="Team B" required>
			<input type="date" v-model="newMatch.date" placeholder="Match Date" required>
			<select v-model="newMatch.status">
			  <option value="In Progress">In Progress</option>
			  <option value="Completed">Completed</option>
			</select>
  
			<button @click="createMatch">Create Match</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 更新比分模态框 -->
	  <div id="updateScoreModal" class="modal" v-if="showUpdateScoreModalFlag" @click.self="closeUpdateScoreModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeUpdateScoreModal">&times;</span>
			<h2>Update Score</h2>
		  </div>
		  <div class="modal-body">
			<label for="updateMatchIdInput">Match ID</label>
			<input type="text" id="updateMatchIdInput" v-model="currentMatch.id" disabled>
  
			<label for="updateScoreInput">Final Score</label>
			<input type="text" id="updateScoreInput" v-model="currentMatch.score" required>
  
			<label for="updateWinnerInput">Winner</label>
			<input type="text" id="updateWinnerInput" v-model="currentMatch.winner">
  
			<button @click="updateScore">Update Score</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 添加事件模态框 -->
	  <div id="addEventModal" class="modal" v-if="showAddEventModalFlag" @click.self="closeAddEventModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeAddEventModal">&times;</span>
			<h2>Add Match Event</h2>
		  </div>
		  <div class="modal-body">
			<label for="eventTypeInput">Event Type</label>
			<input type="text" id="eventTypeInput" v-model="newEvent.type" required>
  
			<label for="eventTimeInput">Event Time</label>
			<input type="number" id="eventTimeInput" v-model="newEvent.time" required>
  
			<label for="eventPlayerInput">Involved Player</label>
			<input type="text" id="eventPlayerInput" v-model="newEvent.player" required>
  
			<label for="eventPointsInput">Impact on Fantasy Points</label>
			<input type="number" id="eventPointsInput" v-model="newEvent.points" required>
  
			<button @click="addEvent">Add Event</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 编辑事件模态框 -->
	  <div id="editEventModal" class="modal" v-if="showEditEventModalFlag" @click.self="closeEditEventModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditEventModal">&times;</span>
			<h2>Edit Match Event</h2>
		  </div>
		  <div class="modal-body">
			<label for="editEventTypeInput">Event Type</label>
			<input type="text" id="editEventTypeInput" v-model="currentEvent.type" required>
  
			<label for="editEventTimeInput">Event Time</label>
			<input type="number" id="editEventTimeInput" v-model="currentEvent.time" required>
  
			<label for="editEventPlayerInput">Involved Player</label>
			<input type="text" id="editEventPlayerInput" v-model="currentEvent.player" required>
  
			<label for="editEventPointsInput">Impact on Fantasy Points</label>
			<input type="number" id="editEventPointsInput" v-model="currentEvent.points" required>
  
			<button @click="saveEventChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	name: 'MatchView',
	data() {
	  return {
		matches: [
		  {
			id: 'Match 1',
			teamA: 'Team A',
			teamB: 'Team B',
			date: '2024-10-15',
			score: 'Pending',
			winner: 'Pending',
			status: 'In Progress'
		  },
		  {
			id: 'Match 2',
			teamA: 'Team C',
			teamB: 'Team D',
			date: '2024-10-20',
			score: '3 - 2',
			winner: 'Team C',
			status: 'Completed'
		  }
		],
		events: [
		  {
			id: 1,
			type: 'Goal',
			time: 15,
			player: 'Player 1 (Team A)',
			points: '+10'
		  },
		  {
			id: 2,
			type: 'Foul',
			time: 30,
			player: 'Player 2 (Team B)',
			points: '-5'
		  }
		],
		updates: [
		  {
			id: 1,
			title: 'Match Score Updated',
			description: 'Match 1 score updated to 3 - 3, no winner decided yet.',
			date: '2024-10-10'
		  },
		  {
			id: 2,
			title: 'New Match Created',
			description: 'Match 3 between Team E and Team F scheduled for 2024-10-25.',
			date: '2024-10-09'
		  }
		],
		showEditModal: false,
		showCreateModal: false,
		showUpdateScoreModalFlag: false,
		showAddEventModalFlag: false,
		showEditEventModalFlag: false,
		currentMatch: {},
		newMatch: {
		  id: '',
		  teamA: '',
		  teamB: '',
		  date: '',
		  status: 'In Progress',
		  score: 'Pending',
		  winner: 'Pending'
		},
		currentEvent: {},
		newEvent: {
		  type: '',
		  time: '',
		  player: '',
		  points: ''
		}
	  };
	},
	methods: {
	  // 编辑比赛
	  editMatch(match) {
		this.currentMatch = { ...match };
		this.showEditModal = true;
	  },
	  // 保存比赛修改
	  saveMatchChanges() {
		const index = this.matches.findIndex(m => m.id === this.currentMatch.id);
		if (index !== -1) {
		  this.matches.splice(index, 1, this.currentMatch);
		}
		this.showEditModal = false;
	  },
	  // 删除比赛
	  deleteMatch(match) {
		if (confirm(`Are you sure you want to delete ${match.id}?`)) {
		  this.matches = this.matches.filter(m => m.id !== match.id);
		}
	  },
	  // 显示创建比赛模态框
	  showCreateMatchModal() {
		this.newMatch = {
		  id: '',
		  teamA: '',
		  teamB: '',
		  date: '',
		  status: 'In Progress',
		  score: 'Pending',
		  winner: 'Pending'
		};
		this.showCreateModal = true;
	  },
	  // 创建新比赛
	  createMatch() {
		const match = { ...this.newMatch };
		this.matches.push(match);
		this.showCreateModal = false;
	  },
	  // 关闭编辑比赛模态框
	  closeEditModal() {
		this.showEditModal = false;
	  },
	  // 关闭创建比赛模态框
	  closeCreateModal() {
		this.showCreateModal = false;
	  },
	  // 显示更新比分模态框
	  showUpdateScoreModal(match) {
		this.currentMatch = { ...match };
		this.showUpdateScoreModalFlag = true;
	  },
	  // 更新比分
	  updateScore() {
		const index = this.matches.findIndex(m => m.id === this.currentMatch.id);
		if (index !== -1) {
		  this.matches.splice(index, 1, this.currentMatch);
		}
		this.showUpdateScoreModalFlag = false;
	  },
	  // 关闭更新比分模态框
	  closeUpdateScoreModal() {
		this.showUpdateScoreModalFlag = false;
	  },
	  // 显示添加事件模态框
	  showAddEventModal() {
		this.newEvent = {
		  type: '',
		  time: '',
		  player: '',
		  points: ''
		};
		this.showAddEventModalFlag = true;
	  },
	  // 添加事件
	  addEvent() {
		const newId = this.events.length ? Math.max(...this.events.map(e => e.id)) + 1 : 1;
		const event = { id: newId, ...this.newEvent };
		this.events.push(event);
		this.showAddEventModalFlag = false;
	  },
	  // 关闭添加事件模态框
	  closeAddEventModal() {
		this.showAddEventModalFlag = false;
	  },
	  // 编辑事件
	  editEvent(event) {
		this.currentEvent = { ...event };
		this.showEditEventModalFlag = true;
	  },
	  // 保存事件修改
	  saveEventChanges() {
		const index = this.events.findIndex(e => e.id === this.currentEvent.id);
		if (index !== -1) {
		  this.events.splice(index, 1, this.currentEvent);
		}
		this.showEditEventModalFlag = false;
	  },
	  // 删除事件
	  deleteEvent(event) {
		if (confirm(`Are you sure you want to delete this event?`)) {
		  this.events = this.events.filter(e => e.id !== event.id);
		}
	  },
	  // 关闭编辑事件模态框
	  closeEditEventModal() {
		this.showEditEventModalFlag = false;
	  }
	}
  };
  </script>
  
  <style scoped>
  /* 样式已在全局 styles.css 中定义，这里可添加特定样式 */
  </style>
  