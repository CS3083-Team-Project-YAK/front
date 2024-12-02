<!-- src/components/MatchForm.vue -->
<template>
  <div>
    <input type="text" v-model="match.id" placeholder="Match ID" required>
    <input type="text" v-model="match.team1" placeholder="Team 1 ID" required>
    <input type="text" v-model="match.team2" placeholder="Team 2 ID" required>
    <input type="date" v-model="match.date" placeholder="Match Date" required>
    <select v-model="match.status">
      <option value="Scheduled">Scheduled</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MatchForm',
  data() {
    return {
      match: {
        id: '',
        team1: '',
        team2: '',
        date: '',
        status: 'Scheduled',
      },
    };
  },
  methods: {
    getMatchData() {
      return this.match;
    }
  }
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
