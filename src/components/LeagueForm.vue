<!-- src/components/LeagueForm.vue -->
<template>
  <div>
    <input type="text" v-model="league.name" placeholder="League Name" required>
    <select v-model="league.type">
      <option value="P">Public</option>
      <option value="R">Private</option>
    </select>
    <input type="text" v-model="league.commissioner" placeholder="Commissioner (User ID)" required>
    <input type="number" v-model="league.maxTeams" placeholder="Maximum Number of Teams" required>
    <input type="date" v-model="league.draftDate" placeholder="Draft Date" required>
  </div>
</template>

<script>
export default {
  name: 'LeagueForm',
  data() {
    return {
      league: {
        name: '',
        type: 'P',
        commissioner: '',
        maxTeams: 0,
        draftDate: '',
      },
    };
  },
  methods: {
    getLeagueData() {
      return this.league;
    }
  }
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
