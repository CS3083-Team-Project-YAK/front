<!-- src/components/AppSidebar.vue -->
<template>
  <div class="sidebar">
    <h2>Fantasy Manager</h2>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/leagues">Leagues</router-link>
    <router-link to="/teams">Teams</router-link>
    <router-link to="/players">Players</router-link>
    <router-link to="/drafts">Drafts</router-link>
    <router-link to="/matches">Matches</router-link>
    <router-link to="/trades">Trades & Waivers</router-link>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar'
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #333;
  color: #fff;
  padding-top: 20px;
}

.sidebar a {
  display: block;
  color: #fff;
  padding: 15px;
  text-decoration: none;
}

.sidebar a:hover {
  background-color: #575757;
}
</style>
