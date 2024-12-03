<template>
  <div class="player-form">
    <h2>{{ isEditMode ? "Edit Player" : "Create Player" }}</h2>
    <div class="form-group">
      <label for="fullName">Full Name</label>
      <input 
        id="fullName"
        type="text" 
        v-model="player.full_name" 
        placeholder="Full Name" 
        required 
      />
    </div>
    
    <div class="form-group">
      <label for="sport">Sport</label>
      <input 
        id="sport"
        type="text" 
        v-model="player.sport" 
        placeholder="Sport" 
        required 
      />
    </div>
    
    <div class="form-group">
      <label for="position">Position</label>
      <input 
        id="position"
        type="text" 
        v-model="player.position" 
        placeholder="Position" 
        required 
      />
    </div>
    
    <div class="form-group">
      <label for="team">Team ID</label>
      <input 
        id="teamID"
        type="text" 
        v-model="player.teamID" 
        placeholder="Team ID" 
        required 
      />
    </div>

    <div class="form-group">
      <label for="team">Team Name</label>
      <input 
        id="real_team"
        type="text" 
        v-model="player.real_team" 
        placeholder="Team Name" 
        required 
      />
    </div>

    <div class="form-group">
      <label for="status">Status</label>
      <select id="status" v-model="player.availability_status">
        <option value="A">Available</option>
        <option value="U">Unavailable</option>
      </select>
    </div>

    <div class="error-message" v-if="error">
      {{ error }}
    </div>

    <div class="form-buttons">
      <button type="submit" @click.prevent="handleSubmit" :disabled="!isFormValid">
        {{ isEditMode ? "Save Changes" : "Create Player" }}
      </button>
      <button type="button" class="cancel-button" @click="handleCancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { createPlayer, updatePlayer } from "@/api/players";

export default {
  name: "PlayerForm",
  props: {
    initialPlayer: {
      type: Object,
      default: () => ({
        full_name: "",
        sport: "",
        position: "",
        teamID: "",
        real_team: "",
        availability_status: "A",
      }),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      player: { ...this.initialPlayer },
      error: null,
    };
  },
  computed: {
    isFormValid() {
      return this.player.full_name && 
             this.player.sport && 
             this.player.position && 
             this.player.teamID && 
             this.player.real_team && 
             this.player.availability_status;
    },
  },
  methods: {
    async handleSubmit() {
      try {
        this.error = null;
        if (this.isEditMode) {
          await updatePlayer(this.player.id, this.player);
          this.$emit("player-saved", "Player updated successfully!");
        } else {
          await createPlayer(this.player);
          this.$emit("player-saved", "Player created successfully!");
        }
        this.$emit("close");
      } catch (error) {
        console.error("Error saving player:", error);
        this.error = error.response?.data?.detail || "Failed to save player";
      }
    },
    handleCancel() {
      this.player = { ...this.initialPlayer };
      this.error = null;
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.player-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: white;
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

.form-buttons button[type="submit"]:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}

.error-message {
  color: #dc3545;
  padding: 10px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #fff3f3;
}
</style>
