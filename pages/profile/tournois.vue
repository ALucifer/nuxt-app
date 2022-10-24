<template>
  <div class="container">
    <h3 class="p-4">Mes tournois</h3>
    <template v-if="myTournaments.loaded && myTournaments.items.length > 0">
      <TournamentTable :params="myTournaments" />
    </template>
    <div v-else class="px-4">
      <h5>Aucun tournoi</h5>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/store/auth";
import TournamentTable from "@/components/TournamentTable";
import { tournaments } from "../../client/tournament";

export default {
  components: {
    TournamentTable,
  },
  head() {
    return {
      title: `Liste de mes tournois`,
    };
  },
  data() {
    return {
      myTournaments: {
        loaded: false,
        items: [],
        query: "mytournament",
        pagination: {
          pages: 0,
          range: 10,
        },
      },
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    queryParamValue() {
      return this.$route.query.mytournament || 1;
    },
  },
  watch: {
    queryParamValue(newValue) {
      this.fetchTournament();
    },
  },
  async created() {
    await this.fetchTournament();
  },
  methods: {
    fetchTournament() {
      tournaments()
        .all({
          user: this.user.id,
          pagination: this.myTournaments.pagination.range,
          page: this.queryParamValue,
        })
        .then((result) => {
          this.myTournaments.items = result.data;
          this.myTournaments.pagination.pages = Math.ceil(
            result.total / this.myTournaments.pagination.range
          );
          this.myTournaments.loaded = true;
        });
    },
  },
};
</script>
