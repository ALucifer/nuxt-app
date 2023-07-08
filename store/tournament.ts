import { defineStore } from "pinia";
import { useAuthStore } from "@/store/auth";
import TournamentClient from "~/app/client/TournamentClient";
import { TournamentModel } from "~/app/models/tournament";

const tournamentClient = new TournamentClient();

export const useTournamentStore = defineStore({
  id: "tournament",
  state: () => {
    return {
      items: [] as TournamentModel[],
      highlighted: [] as TournamentModel[],
      search: null,
      total: 0,
      totalLoaded: 0,
      currentPage: 1,
      currentTournament: null,
    };
  },
  getters: {
    filteredItems(state) {
      return state.items || {};
    },
    itemsShow(state) {
      return state.total;
    },
    isFullyLoaded(state) {
      return state.total == state.totalLoaded;
    },
    getCurrentTournament(state) {
      return state.currentTournament
    },
  },
  actions: {
    fetchItems() {
      return tournamentClient.all({
        page: this.currentPage,
        ...this.search,
      }).then((result) => {
        this.setItems(this.items.concat(result.data));
        this.setTotal(result.total);
        this.totalLoaded = this.items.length;
      })
    },
    async fetchItem(id: number) {
      return await tournamentClient
          .findById(id)
          .then((data) => this.currentTournament = data);
    },
    async fetchNextItems() {
      this.incrementCurrentPage();
      await this.fetchItems();
    },
    async setSearch({ form }: any) {
      this.currentPage = 1;
      this.items = [];
      this.search = form;
      await this.fetchItems();
    },
    setItems(items: any) {
      this.items = items;
    },
    setTotal(total: number) {
      this.total = total;
    },
    incrementCurrentPage() {
      this.currentPage++;
    },
    async register(form: any) {
      const authStore = useAuthStore();
      form.user_id = authStore.user.id;
      return await tournamentClient.register(form)
    },
    fetchHightlighted() {
      return tournamentClient.hightlighted().then(data => this.highlighted = data);
    },
    async start(tournament: any) {
     return await tournamentClient.start(tournament);
    },
    async unsubscribe(tournament_id: number, user_id: number) {
      return await tournamentClient.unsubscribe(tournament_id, user_id);
    },
    setCurrentTournament(tournament: any) {
      this.currentTournament = tournament
    }
  },
});
