
<template>
  <div class="create-team-modal">
    <h3>Create New Team</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Team Name:</label>
        <input v-model="team.name" required />
      </div>
      <div class="form-group">
        <label>Owner:</label>
        <input v-model="team.owner" required />
      </div>
      <div class="form-group">
        <label>League:</label>
        <input v-model="team.league" required />
      </div>
      <div class="buttons">
        <button type="submit">Create</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createTeam } from '@/api/teams';

export default {
  name: 'CreateTeamModal',
  data() {
    return {
      team: {
        name: '',
        owner: '',
        league: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await createTeam(this.team);
        this.$emit('team-saved');
      } catch (error) {
        console.error('Error creating team:', error);
      }
    }
  }
};
</script>

<style scoped>
.create-team-modal {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>