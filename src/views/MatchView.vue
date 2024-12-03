<template>
  <div class="match-view">
    <h2>Matches</h2>
    <button @click="openCreateModal">Create New Match</button>
    <table>
      <thead>
        <tr>
          <th>Match ID</th>
          <th>Teams</th>
          <th>Date</th>
          <th>Final Score</th>
          <th>Winner</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="match in matches" :key="match.matchID">
          <td>{{ match.matchID }}</td>
          <td>{{ match.team1ID }} vs {{ match.team2ID }}</td>
          <td>{{ match.match_date }}</td>
          <td>{{ match.final_score }}</td>
          <td>{{ match.winner }}</td>
          <td>
            <button @click="openEditModal(match)">Edit</button>
            <button @click="deleteMatch(match.matchID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showModal" class="modal">
      <MatchForm
        :initialMatch="selectedMatch"
        :isEditMode="isEditMode"
        @match-saved="handleMatchSaved"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script>
import MatchForm from "@/components/MatchForm.vue";
import { getAllMatches, createMatch, updateMatchResults } from "@/api/matches";

export default {
  name: "MatchView",
  components: { MatchForm },
  data() {
    return {
      matches: [],
      showModal: false,
      isEditMode: false,
      selectedMatch: null,
    };
  },
  methods: {
    async fetchMatches() {
      try {
        const response = await getAllMatches();
        this.matches = response.data;
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    },
    openCreateModal() {
      this.isEditMode = false;
      this.selectedMatch = {
        team1ID: "",
        team2ID: "",
        winner: "0",
        match_date: "",
        final_score: "",
      };
      this.showModal = true;
    },
    openEditModal(match) {
      this.isEditMode = true;
      this.selectedMatch = { ...match };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async handleMatchSaved(match) {
      try {
        if (this.isEditMode) {
          await updateMatchResults(match.matchID, match);
          alert("Match updated successfully!");
        } else {
          await createMatch(match);
          alert("Match created successfully!");
        }
        this.fetchMatches();
        this.closeModal();
      } catch (error) {
        console.error("Error saving match:", error);
      }
    },
    async deleteMatch(matchID) {
      if (confirm("Are you sure you want to delete this match?")) {
        try {
          // Assume deleteMatch API exists
          alert("Match deleted successfully!");
          this.fetchMatches();
        } catch (error) {
          console.error("Error deleting match:", error);
        }
      }
    },
  },
  created() {
    this.fetchMatches();
  },
};
</script>

<style scoped>
.match-view {
  margin-left: 250px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  z-index: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

tr:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .match-view {
    margin-left: 0;
    padding: 10px;
  }
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
