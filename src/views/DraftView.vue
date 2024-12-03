<!-- src/views/Drafts.vue -->
<template>
	<div class="main-content">
	  <div class="content-block">
		<h2>Drafts List</h2>
		<button class="create-button" @click="showCreateDraftModal">Create New Draft</button>
		<table class="drafts-table">
		  <thead>
			<tr>
			  <th>Draft Name</th>
			  <th>League ID</th>
			  <th>Draft Date</th>
			  <th>Order Type</th>
			  <th>Status</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="draft in drafts" :key="draft.id">
			  <td>{{ draft.name }}</td>
			  <td>{{ draft.league }}</td>
			  <td>{{ draft.date }}</td>
			  <td>{{ draft.orderType }}</td>
			  <td>{{ draft.status }}</td>
			  <td>
				<button class="edit-button" @click="editDraft(draft)">Edit</button>
				<button class="delete-button" @click="deleteDraft(draft)">Delete</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	  <!-- 分页（可根据需要添加功能） -->
	  <div class="pagination">
		<button>&laquo; Prev</button>
		<button>1</button>
		<button>2</button>
		<button>3</button>
		<button>Next &raquo;</button>
	  </div>
  
	  <!-- 编辑模态框 -->
	  <div id="editModal" class="modal" v-if="showEditModal" @click.self="closeEditModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeEditModal">&times;</span>
			<h2>Edit Draft</h2>
		  </div>
		  <div class="modal-body">
			<label for="draftNameInput">Draft Name</label>
			<input type="text" id="draftNameInput" v-model="currentDraft.name" required>
  
			<label for="leagueInput">League ID</label>
			<input type="text" id="leagueInput" v-model="currentDraft.league" required>
  
			<label for="dateInput">Draft Date</label>
			<input type="date" id="dateInput" v-model="currentDraft.date" required>
  
			<label for="orderTypeInput">Order Type</label>
			<select id="orderTypeInput" v-model="currentDraft.orderType">
			  <option value="Round-robin">Round-robin</option>
			  <option value="Snake">Snake</option>
			</select>
  
			<label for="statusInput">Draft Status</label>
			<select id="statusInput" v-model="currentDraft.status">
			  <option value="In-progress">In-progress</option>
			  <option value="Completed">Completed</option>
			  <option value="Scheduled">Scheduled</option>
			</select>
  
			<button @click="saveChanges">Save Changes</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 创建模态框 -->
	  <div id="createModal" class="modal" v-if="showCreateModal" @click.self="closeCreateModal">
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close" @click="closeCreateModal">&times;</span>
			<h2>Create New Draft</h2>
		  </div>
		  <div class="modal-body">
			<label for="newDraftNameInput">Draft Name</label>
			<input type="text" id="newDraftNameInput" v-model="newDraft.name" required>
  
			<label for="newLeagueInput">League ID</label>
			<input type="text" id="newLeagueInput" v-model="newDraft.league" required>
  
			<label for="newDateInput">Draft Date</label>
			<input type="date" id="newDateInput" v-model="newDraft.date" required>
  
			<label for="newOrderTypeInput">Order Type</label>
			<select id="newOrderTypeInput" v-model="newDraft.orderType">
			  <option value="Round-robin">Round-robin</option>
			  <option value="Snake">Snake</option>
			</select>
  
			<label for="newStatusInput">Draft Status</label>
			<select id="newStatusInput" v-model="newDraft.status">
			  <option value="In-progress">In-progress</option>
			  <option value="Completed">Completed</option>
			  <option value="Scheduled">Scheduled</option>
			</select>
  
			<button @click="createDraft">Create Draft</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	name: 'DraftView',
	data() {
	  return {
		drafts: [
		  { id: 1, name: 'Draft 1', league: 'League 1', date: '2024-10-01', orderType: 'Round-robin', status: 'Completed' },
		  { id: 2, name: 'Draft 2', league: 'League 2', date: '2024-10-15', orderType: 'Snake', status: 'Scheduled' }
		],
		showEditModal: false,
		showCreateModal: false,
		currentDraft: {},
		newDraft: {
		  name: '',
		  league: '',
		  date: '',
		  orderType: 'Round-robin',
		  status: 'In-progress'
		}
	  };
	},
	methods: {
	  // 编辑草稿
	  editDraft(draft) {
		this.currentDraft = { ...draft };
		this.showEditModal = true;
	  },
	  // 保存修改
	  saveChanges() {
		const index = this.drafts.findIndex(d => d.id === this.currentDraft.id);
		if (index !== -1) {
		  this.drafts.splice(index, 1, this.currentDraft);
		}
		this.showEditModal = false;
	  },
	  // 删除草稿
	  deleteDraft(draft) {
		if (confirm(`Are you sure you want to delete ${draft.name}?`)) {
		  this.drafts = this.drafts.filter(d => d.id !== draft.id);
		}
	  },
	  // 显示创建草稿模态框
	  showCreateDraftModal() {
		this.newDraft = {
		  name: '',
		  league: '',
		  date: '',
		  orderType: 'Round-robin',
		  status: 'In-progress'
		};
		this.showCreateModal = true;
	  },
	  // 创建新草稿
	  createDraft() {
		const newId = this.drafts.length ? Math.max(...this.drafts.map(d => d.id)) + 1 : 1;
		const draft = { id: newId, ...this.newDraft };
		this.drafts.push(draft);
		this.showCreateModal = false;
	  },
	  // 关闭编辑模态框
	  closeEditModal() {
		this.showEditModal = false;
	  },
	  // 关闭创建模态框
	  closeCreateModal() {
		this.showCreateModal = false;
	  }
	}
  };
  </script>
  
  <style scoped>
  /* 样式已在全局 styles.css 中定义，这里可添加特定样式 */
  </style>
  