import { defineStore } from "pinia";
import { tournaments } from "../client/tournament";
import { useAuthStore } from "@/store/auth";

export const useTournamentStore = defineStore({
  id: "tournament",
  state: () => {
    return {
      items: [],
      hightlighted: [],
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
      const result = await tournaments().all({
        page: this.currentPage,
        ...this.search,
      });
      this.setItems(this.items.concat(result.data));
      this.setTotal(result.total);
      this.totalLoaded = this.items.length;
    },
    async fetchItem(id) {
      const result = await tournaments().get(id);
      this.currentTournament = result.data;
      return result.status === 200 ? true : false;
    },
    async fetchNextItems() {
      this.incrementCurrentPage();
      await this.fetchItems();
    },
    async setSearch({ form }) {
      this.currentPage = 1;
      this.items = [];
      this.search = form;
      await this.fetchItems();
    },
    setItems(items) {
      this.items = items;
    },
    setTotal(total) {
      this.total = total;
    },
    incrementCurrentPage() {
      this.currentPage++;
    },
    async register(form) {
      const authStore = useAuthStore();
      form.user_id = authStore.user.id;
      return await tournaments().register(form);
    },
    async fetchHightlighted() {
      this.hightlighted = await tournaments().hightlighted();
    },
    async start(tournament) {
      await tournaments().start(tournament);
      await this.fetchItem(tournament.id);
    },
    async unsubscribe(tournament_id, user_id) {
      await tournaments().unsubscribe(tournament_id, user_id);
      await this.fetchItem(tournament_id);
    },
  },
});
