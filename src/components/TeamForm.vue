<template>
  <div class="team-form">
    <h2>{{ isEditMode ? "Edit Team" : "Create Team" }}</h2>
    <div class="form-group">
      <label for="teamName">Team Name</label>
      <input 
        id="teamName"
        type="text" 
        v-model="team.name" 
        placeholder="Team Name" 
        required 
      />
    </div>
    
    <div class="form-group">
      <label for="ownerId">Owner ID</label>
      <input 
        id="ownerId"
        type="number" 
        v-model.number="team.owner" 
        placeholder="Owner ID" 
        required 
      />
    </div>
    
    <div class="form-group">
      <label for="leagueId">League ID</label>
      <input 
        id="leagueId"
        type="number" 
        v-model.number="team.league" 
        placeholder="League ID" 
        required 
      />
    </div>
    
    <div class="form-group">
      <label for="status">Status</label>
      <select id="status" v-model="team.status">
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>

    <div class="error-message" v-if="error">
      {{ error }}
    </div>

    <div class="form-buttons">
      <button type="submit" @click.prevent="handleSubmit" :disabled="!isFormValid">
        {{ isEditMode ? "Save Changes" : "Create Team" }}
      </button>
      <button type="button" class="cancel-button" @click="handleCancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { createTeam, updateTeam } from "@/api/teams";

export default {
  name: "TeamForm",
  props: {
    initialTeam: {
      type: Object,
      default: () => ({
        name: "",
        owner: "",
        league: "",
        status: "ACTIVE",
      }),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      team: { ...this.initialTeam },
      error: null,
    };
  },
  computed: {
    isFormValid() {
      return this.team.name && 
             this.team.owner && 
             this.team.league && 
             this.team.status;
    },
  },
  methods: {
    async handleSubmit() {
      try {
        this.error = null;
        
        // 数据验证
        if (!this.team.name?.trim()) {
          this.error = "Team name is required";
          return;
        }
        
        if (!this.team.owner) {
          this.error = "Owner ID is required";
          return;
        }
        
        if (!this.team.league) {
          this.error = "League ID is required";
          return;
        }

        const teamData = {
          name: this.team.name.trim(),
          owner: parseInt(this.team.owner),
          league: parseInt(this.team.league),
          status: this.team.status || 'ACTIVE'
        };

        // 打印请求数据
        console.log('Submitting team data:', teamData);

        if (this.isEditMode) {
          await updateTeam(this.team.id, teamData);
          this.$emit("team-saved", "Team updated successfully!");
        } else {
          await createTeam(teamData);
          this.$emit("team-saved", "Team created successfully!");
        }
        this.$emit("close");
      } catch (error) {
        console.error("Error saving team:", error);
        
        if (error.response?.status === 500) {
          this.error = "Server error occurred. Please try again later.";
        } else if (error.response?.status === 401) {
          this.error = "Please login again to continue.";
          // 可能需要重定向到登录页面
          this.$router.push('/login');
        } else if (error.response?.status === 422) {
          const errorDetail = error.response.data[0]?.msg || "Invalid form data. Please check your inputs.";
          this.error = `Validation error: ${errorDetail}`;
        } else {
          this.error = error.message || "An error occurred while saving the team.";
        }
      }
    },
    handleCancel() {
      // 重置表单
      this.team = { ...this.initialTeam };
      this.error = null;
      // 触发关闭事件
      this.$emit('close');
    },
    resetForm() {
      this.team = {
        name: "",
        owner: "",
        league: "",
        status: "ACTIVE",
      };
      this.error = null;
    },
  },
};
</script>

<style scoped>
.team-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.form-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.form-buttons button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

.form-buttons button[type="submit"]:hover {
  background-color: #45a049;
}

.form-buttons button[type="submit"]:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}

.cancel-button:hover {
  background-color: #5a6268;
}

.error-message {
  color: #dc3545;
  padding: 10px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #fff3f3;
  margin-top: 10px;
}
</style>
