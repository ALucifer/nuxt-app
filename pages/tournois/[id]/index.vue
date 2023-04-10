<template>
  <div>
    <TournamentResume v-if="loaded" />
    <div class="container my-4" v-else>
      <div class="col-10 mx-auto">
        <AppLoader />
      </div>
    </div>
  </div>
</template>

<script>
import TournamentResume from "@/components/TournamentResume";
import { useTournamentStore } from "~/store/tournament";
import { mapState } from "pinia";

export default defineNuxtComponent({
  components: { TournamentResume },
  data() {
    return {
      loaded: false,
    };
  },
  provide() {
    return {
      tournament: computed(() => this.currentTournament),
    };
  },
  computed: {
    ...mapState(useTournamentStore, ["currentTournament"]),
  },
  async asyncData({ $pinia }) {
    const route = useRoute();
    const tournamentStore = useTournamentStore($pinia);
    await tournamentStore.fetchItem(route.params.id);

    return {};
  },
  mounted() {
    if (!this.currentTournament) {
      return this.$router.push({ name: "index" });
    }

    this.loaded = true;
  },
});
</script>
<style scoped></style>
