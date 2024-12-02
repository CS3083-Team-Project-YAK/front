<!-- src/components/TeamForm.vue -->
<template>
  <div>
    <input type="text" v-model="team.name" placeholder="Team Name" required>
    <input type="text" v-model="team.owner" placeholder="Owner (User ID)" required>
    <input type="text" v-model="team.league" placeholder="League ID" required>
    <select v-model="team.status">
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TeamForm',
  data() {
    return {
      team: {
        name: '',
        owner: '',
        league: '',
        status: 'active',
      },
    };
  },
  methods: {
    getTeamData() {
      return this.team;
    }
  }
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
