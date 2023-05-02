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
  },
  actions: {
    async fetchItems() {
      const result = await tournamentClient.all({
        page: this.currentPage,
        ...this.search,
      });
      this.setItems(this.items.concat(result.data));
      this.setTotal(result.total);
      this.totalLoaded = this.items.length;
    },
    async fetchItem(id: number) {
      this.currentTournament = await tournamentClient.findById(id);
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
      return await tournamentClient.register(form);
    },
    async fetchHightlighted() {
      this.highlighted = await tournamentClient.hightlighted();

    },
    async start(tournament: any) {
      await tournamentClient.start(tournament);
      await this.fetchItem(tournament.id);
    },
    async unsubscribe(tournament_id: number, user_id: number) {
      await tournamentClient.unsubscribe(tournament_id, user_id);
    },
  },
});
