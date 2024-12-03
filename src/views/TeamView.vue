<template>
  <div class="main-content">
    <h2>Teams List</h2>
    <button @click="openCreateModal">Create New Team</button>
    <table>
      <thead>
        <tr>
          <th>Team ID</th>
          <th>Owner</th>
          <th>League ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teams" :key="team.teamID">
          <td>{{ team.teamID }}</td>
          <td>{{ team.owner }}</td>
          <td>{{ team.leagueID }}</td>
          <td>{{ team.status }}</td>
          <td>
            <button @click="openEditModal(team)">Edit</button>
            <button @click="deleteTeam(team)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for creating or editing teams -->
    <div v-if="showModal" class="modal">
		<TeamForm
    :initialTeam="selectedTeam"
    :isEditMode="isEditMode"
    @team-saved="handleTeamSaved"
    @close="closeModal"
  	/>
	</div>
  </div>
</template>

<script>
import { deleteTeam, getTeams } from "@/api/teams";
import TeamForm from "@/components/TeamForm.vue";

export default {
  name: "TeamView",
  components: { TeamForm },
  data() {
    return {
      teams: [],
      showModal: false,
      isEditMode: false,
      selectedTeam: null,
    };
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await getTeams();
        this.teams = response.data;
        console.log(this.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },
    openCreateModal() {
      this.isEditMode = false;
      this.selectedTeam = null;
      this.showModal = true;
    },
    openEditModal(team) {
      this.isEditMode = true;
      this.selectedTeam = {
        id: team.teamID, // Map teamID to id for the form
        name: team.name,
        owner: team.owner,
        league: team.leagueID, // Map leagueID to league for the form
        status: team.status
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteTeam(team) {
      if (confirm(`Are you sure you want to delete ${team.name}?`)) {
        try {
          await deleteTeam(team.teamID); // Changed from team.id to team.teamID
          alert("Team deleted successfully!");
          this.fetchTeams();
        } catch (error) {
          console.error("Error deleting team:", error);
        }
      }
    },
    handleTeamSaved() {
      this.fetchTeams();
      this.closeModal();
    },
  },
  created() {
    this.fetchTeams();
  },
};
</script>

<style scoped>
/* 样式调整 */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1000;
}
</style>
