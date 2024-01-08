import { defineStore } from "pinia";
import TournamentClient from "~/app/client/TournamentClient";
import {TournamentModel, TournamentModelWithMatchesAndTeams} from "~/app/models/tournament";
import {TeamModel} from "~/app/models/team.model";

const tournamentClient = new TournamentClient();

export const useTournamentStore = defineStore({
  id: "tournament",
  state: () => {
    return {
      items: [] as TournamentModel[],
      searchForm: [],
      total: 0,
      currentPage: 1,
      currentTournament: {} as TournamentModelWithMatchesAndTeams,
      isOwner: false
    };
  },
  getters: {
    filteredItems(state): TournamentModel[]  {
      return state.items || [];
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
    removeUserTeamFromCurrentTournament() {
      const { getUser } = useSecurity()
      const index = this.currentTournament!.teams!.findIndex((team: TeamModel) => team.user_id === getUser().id)
      this.currentTournament!.teams!.splice(index, 1)
    },
    async fetchTournaments() {
      const data = await $fetch('/api/tournaments/all')

      this.setItems(data.data)
      this.setTotal(data.meta.total)
    },
    async fetchTournament(id: number) {
      return tournamentClient
          .findById(id)
          .then((data) => this.currentTournament = data)
          .catch((error) => error(error));
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
      const { getUser } = useSecurity()
      form.user_id = getUser().id;

      return await tournamentClient.register(form)
    },
    async start(tournament: any) {
     return await tournamentClient.start(tournament);
    },
    async unsubscribe(tournament_id: number) {
      return await tournamentClient.unsubscribe(tournament_id);
    },
    setCurrentTournament(tournament: any) {
      this.currentTournament = tournament
    }
  },
});
