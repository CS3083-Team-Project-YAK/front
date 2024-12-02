<!-- src/components/PlayerForm.vue -->
<template>
  <div>
    <input type="text" v-model="player.name" placeholder="Player Name" required>
    <input type="text" v-model="player.sport" placeholder="Sport" required>
    <input type="text" v-model="player.position" placeholder="Position" required>
    <input type="text" v-model="player.team" placeholder="Real-Life Team" required>
    <input type="number" v-model="player.points" placeholder="Fantasy Points" required>
  </div>
</template>

<script>
export default {
  name: 'PlayerForm',
  data() {
    return {
      player: {
        name: '',
        sport: '',
        position: '',
        team: '',
        points: 0,
      },
    };
  },
  methods: {
    getPlayerData() {
      return this.player;
    }
  }
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
