import { defineStore } from "pinia";
import TournamentClient from "~/app/client/TournamentClient";
import { TournamentModel } from "~/app/models/tournament";

const tournamentClient = new TournamentClient();

export const useTournamentStore = defineStore({
  id: "tournament",
  state: () => {
    return {
      items: [] as TournamentModel[],
      highlighted: [] as TournamentModel[],
      searchForm: [],
      total: 0,
      currentPage: 1,
      currentTournament: {} as TournamentModel,
      isOwner: false
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
      return state.total == state.items?.length;
    },
    getCurrentTournament(state) {
      return state.currentTournament
    },
    getTotalLoaded(state)  {
      return state.items?.length
    }
  },
  actions: {
    toggleOwner() {
      this.isOwner = !this.isOwner
    },
    async fetchItem(id: number) {
      return await tournamentClient
          .findById(id)
          .then((data) => this.currentTournament = data);
    },
    fetchNextItems() {
      this.incrementCurrentPage();
      tournamentClient.all({
        page: this.currentPage,
        ...this.searchForm,
      }).then((result) => {
        this.setItems(this.items.concat(result.data))
      })
    },
    sendSearch({ form }: any) {
      tournamentClient.all(form).then((result) => {
        this.reset()
        this.setTotal(result.meta.total)
        this.setItems(result.data)
        this.searchForm = form
      })
    },
    reset() {
      this.currentPage = 1;
      this.items = [];
      this.total = 0;
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
      const { data } = useAuth()
      form.user_id = data.value.user.id;

      return await tournamentClient.register(form)
    },
    setHightlighted(items: TournamentModel[]) {
      this.highlighted = items
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
