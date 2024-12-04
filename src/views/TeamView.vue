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

    <!-- Separate Modals for creating and editing teams -->
    <div v-if="showCreateModal" class="modal">
      <CreateTeamModal
        @team-saved="handleTeamSaved"
        @close="closeCreateModal"
      />
    </div>

    <div v-if="showEditModal" class="modal">
      <TeamForm
        :initialTeam="selectedTeam"
        :isEditMode="true"
        @team-saved="handleTeamSaved"
        @close="closeEditModal"
      />
    </div>
  </div>
</template>

<script>
import { deleteTeam, getTeams } from "@/api/teams";
import TeamForm from "@/components/TeamForm.vue";
import CreateTeamModal from "@/components/CreateTeamModal.vue";

export default {
  name: "TeamView",
  components: { TeamForm, CreateTeamModal },
  data() {
    return {
      teams: [],
      showCreateModal: false,
      showEditModal: false,
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
      this.showCreateModal = true;
    },
    openEditModal(team) {
      this.selectedTeam = {
        teamID: team.teamID,
        name: team.name,
        owner: team.owner,
        league: team.leagueID,
        status: team.status
      };
      this.showEditModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.selectedTeam = null;
    },
    async deleteTeam(team) {
      if (confirm(`Are you sure you want to delete ${team.name}?`)) {
        try {
          await deleteTeam(team.teamID); // Change from team.id to team.teamID
          alert("Team deleted successfully!");
          this.fetchTeams();
        } catch (error) {
          console.error("Error deleting team:", error);
        }
      }
    },
    handleTeamSaved() {
      this.fetchTeams();
      this.closeCreateModal();
      this.closeEditModal();
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
