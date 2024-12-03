<template>
  <div class="match-form">
    <h2>{{ isEditMode ? "Edit Match" : "Create Match" }}</h2>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="match.team1ID"
        type="text"
        placeholder="Team 1 ID"
        required
      />
      <input
        v-model="match.team2ID"
        type="text"
        placeholder="Team 2 ID"
        required
      />
      <input
        v-model="match.match_date"
        type="date"
        placeholder="Match Date"
        required
      />
      <input
        v-model="match.final_score"
        type="text"
        placeholder="Final Score"
      />
      <select v-model="match.winner">
        <option value="0">Pending</option>
        <option v-for="team in [match.team1ID, match.team2ID]" :key="team" :value="team">
          {{ team }}
        </option>
      </select>
      <div class="form-buttons">
        <button type="submit">
          {{ isEditMode ? "Save Changes" : "Create Match" }}
        </button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "MatchForm",
  props: {
    initialMatch: {
      type: Object,
      default: () => ({
        team1ID: "",
        team2ID: "",
        winner: "0",
        match_date: "",
        final_score: "",
      }),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      match: { ...this.initialMatch },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("match-saved", this.match);
    },
  },
};
</script>

<style scoped>
.match-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 8px;
}

.match-form h2 {
  margin-bottom: 10px;
}

.match-form input,
.match-form select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-buttons button:first-child {
  background-color: #007bff;
  color: #fff;
}

.form-buttons button:last-child {
  background-color: #6c757d;
  color: #fff;
}

.form-buttons button:hover {
  opacity: 0.9;
}
</style>
