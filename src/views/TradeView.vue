<!-- src/views/Trades.vue -->
<template>
	<div class="main-content">
	  <!-- Trades 部分 -->
	  <div class="content-block">
		<h2>Trades</h2>
		<button class="create-button" @click="showCreateTradeModal">Create New Trade</button>
		<table class="table">
		  <thead>
			<tr>
			  <th>Trade ID</th>
			  <th>Involved Teams</th>
			  <th>Traded Players</th>
			  <th>Trade Date</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="trade in trades" :key="trade.id">
			  <td>{{ trade.id }}</td>
			  <td>{{ trade.teams }}</td>
			  <td>{{ trade.players }}</td>
			  <td>{{ trade.date }}</td>
			  <td>
				<button class="edit-button" @click="editTrade(trade)">Edit</button>
				<button class="delete-button" @click="deleteTrade(trade)">Delete</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  
	  <!-- Waivers 部分 -->
	  <div class="content-block">
		<h2>Waivers</h2>
		<button class="create-button" @click="showCreateWaiverModal">Create New Waiver</button>
		<table class="table">
		  <thead>
			<tr>
			  <th>Waiver Order</th>
			  <th>Status</th>
			  <th>Pickup Date</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="waiver in waivers" :key="waiver.id">
			  <td>{{ waiver.team }}</td>
			  <td>{{ waiver.status }}</td>
			  <td>{{ waiver.date }}</td>
			  <td>
				<button class="approve-button" @click="approveWaiver(waiver)" v-if="waiver.status === 'Pending'">Approve</button>
				<button class="edit-button" @click="editWaiver(waiver)">Edit</button>
				<button class="delete-button" @click="deleteWaiver(waiver)">Delete</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  
	  <!-- 分页（如果需要，可以添加功能） -->
	  <div class="pagination">
		<button>&laquo; Prev</button>
		<button>1</button>
		<button>2</button>
		<button>3</button>
		<button>Next &raquo;</button>
	  </div>
  
	  <!-- 创建 Trade 模态框 -->
	  <div id="createTradeModal" class="modal" v-if="showCreateTradeModalFlag" @click.self="closeCreateTradeModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeCreateTradeModal">&times;</span>
			<h2>Create New Trade</h2>
		  </div>
		  <div class="modal-body">
			<label for="tradeIdInput">Trade ID</label>
			<input type="text" id="tradeIdInput" v-model="newTrade.id" required>
  
			<label for="tradeTeamsInput">Involved Teams</label>
			<input type="text" id="tradeTeamsInput" v-model="newTrade.teams" required>
  
			<label for="tradePlayersInput">Traded Players</label>
			<input type="text" id="tradePlayersInput" v-model="newTrade.players" required>
  
			<label for="tradeDateInput">Trade Date</label>
			<input type="date" id="tradeDateInput" v-model="newTrade.date" required>
  
			<button @click="createTrade">Create Trade</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 编辑 Trade 模态框 -->
	  <div id="editTradeModal" class="modal" v-if="showEditTradeModalFlag" @click.self="closeEditTradeModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditTradeModal">&times;</span>
			<h2>Edit Trade</h2>
		  </div>
		  <div class="modal-body">
			<label for="editTradeIdInput">Trade ID</label>
			<input type="text" id="editTradeIdInput" v-model="currentTrade.id" required>
  
			<label for="editTradeTeamsInput">Involved Teams</label>
			<input type="text" id="editTradeTeamsInput" v-model="currentTrade.teams" required>
  
			<label for="editTradePlayersInput">Traded Players</label>
			<input type="text" id="editTradePlayersInput" v-model="currentTrade.players" required>
  
			<label for="editTradeDateInput">Trade Date</label>
			<input type="date" id="editTradeDateInput" v-model="currentTrade.date" required>
  
			<button @click="saveTradeChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 创建 Waiver 模态框 -->
	  <div id="createWaiverModal" class="modal" v-if="showCreateWaiverModalFlag" @click.self="closeCreateWaiverModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeCreateWaiverModal">&times;</span>
			<h2>Create New Waiver</h2>
		  </div>
		  <div class="modal-body">
			<label for="waiverTeamInput">Team</label>
			<input type="text" id="waiverTeamInput" v-model="newWaiver.team" required>
  
			<label for="waiverStatusInput">Status</label>
			<select id="waiverStatusInput" v-model="newWaiver.status">
			  <option value="Pending">Pending</option>
			  <option value="Approved">Approved</option>
			</select>
  
			<label for="waiverDateInput">Pickup Date</label>
			<input type="date" id="waiverDateInput" v-model="newWaiver.date" required>
  
			<button @click="createWaiver">Create Waiver</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 编辑 Waiver 模态框 -->
	  <div id="editWaiverModal" class="modal" v-if="showEditWaiverModalFlag" @click.self="closeEditWaiverModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditWaiverModal">&times;</span>
			<h2>Edit Waiver</h2>
		  </div>
		  <div class="modal-body">
			<label for="editWaiverTeamInput">Team</label>
			<input type="text" id="editWaiverTeamInput" v-model="currentWaiver.team" required>
  
			<label for="editWaiverStatusInput">Status</label>
			<select id="editWaiverStatusInput" v-model="currentWaiver.status">
			  <option value="Pending">Pending</option>
			  <option value="Approved">Approved</option>
			</select>
  
			<label for="editWaiverDateInput">Pickup Date</label>
			<input type="date" id="editWaiverDateInput" v-model="currentWaiver.date" required>
  
			<button @click="saveWaiverChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	name: 'TradeView',
	data() {
	  return {
		trades: [
		  { id: 'Trade 1', teams: 'Team A, Team B', players: 'Player 1, Player 2', date: '2024-10-12' },
		  { id: 'Trade 2', teams: 'Team C, Team D', players: 'Player 3, Player 4', date: '2024-10-14' },
		],
		waivers: [
		  { id: 1, team: 'Team A', status: 'Pending', date: '2024-10-16' },
		  { id: 2, team: 'Team B', status: 'Approved', date: '2024-10-18' },
		],
		showCreateTradeModalFlag: false,
		showEditTradeModalFlag: false,
		showCreateWaiverModalFlag: false,
		showEditWaiverModalFlag: false,
		newTrade: {
		  id: '',
		  teams: '',
		  players: '',
		  date: '',
		},
		currentTrade: {},
		newWaiver: {
		  team: '',
		  status: 'Pending',
		  date: '',
		},
		currentWaiver: {},
	  };
	},
	methods: {
	  // Trade 相关方法
	  showCreateTradeModal() {
		this.newTrade = {
		  id: '',
		  teams: '',
		  players: '',
		  date: '',
		};
		this.showCreateTradeModalFlag = true;
	  },
	  closeCreateTradeModal() {
		this.showCreateTradeModalFlag = false;
	  },
	  createTrade() {
		const trade = { ...this.newTrade };
		this.trades.push(trade);
		this.showCreateTradeModalFlag = false;
	  },
	  editTrade(trade) {
		this.currentTrade = { ...trade };
		this.showEditTradeModalFlag = true;
	  },
	  closeEditTradeModal() {
		this.showEditTradeModalFlag = false;
	  },
	  saveTradeChanges() {
		const index = this.trades.findIndex(t => t.id === this.currentTrade.id);
		if (index !== -1) {
		  this.trades.splice(index, 1, this.currentTrade);
		}
		this.showEditTradeModalFlag = false;
	  },
	  deleteTrade(trade) {
		if (confirm(`Are you sure you want to delete ${trade.id}?`)) {
		  this.trades = this.trades.filter(t => t.id !== trade.id);
		}
	  },
  
	  // Waiver 相关方法
	  showCreateWaiverModal() {
		this.newWaiver = {
		  team: '',
		  status: 'Pending',
		  date: '',
		};
		this.showCreateWaiverModalFlag = true;
	  },
	  closeCreateWaiverModal() {
		this.showCreateWaiverModalFlag = false;
	  },
	  createWaiver() {
		const newId = this.waivers.length ? Math.max(...this.waivers.map(w => w.id)) + 1 : 1;
		const waiver = { id: newId, ...this.newWaiver };
		this.waivers.push(waiver);
		this.showCreateWaiverModalFlag = false;
	  },
	  editWaiver(waiver) {
		this.currentWaiver = { ...waiver };
		this.showEditWaiverModalFlag = true;
	  },
	  closeEditWaiverModal() {
		this.showEditWaiverModalFlag = false;
	  },
	  saveWaiverChanges() {
		const index = this.waivers.findIndex(w => w.id === this.currentWaiver.id);
		if (index !== -1) {
		  this.waivers.splice(index, 1, this.currentWaiver);
		}
		this.showEditWaiverModalFlag = false;
	  },
	  deleteWaiver(waiver) {
		if (confirm(`Are you sure you want to delete waiver for ${waiver.team}?`)) {
		  this.waivers = this.waivers.filter(w => w.id !== waiver.id);
		}
	  },
	  approveWaiver(waiver) {
		const index = this.waivers.findIndex(w => w.id === waiver.id);
		if (index !== -1) {
		  this.waivers[index].status = 'Approved';
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  /* 样式调整和引入 */
  @import '@/assets/styles.css';
  
  /* 如果有特定于此组件的样式，可以在这里添加 */
  </style>
  