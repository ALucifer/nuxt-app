import { defineStore } from "pinia";
import {TournamentModel, TournamentModelWithMatchesAndTeams} from "~/app/models/tournament";
import {TeamModel} from "~/app/models/team.model";

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
      this.currentTournament = await $fetch(`/api/tournaments/${id}`)

      return this.currentTournament
    },
    async fetchNextItems() {
      this.incrementCurrentPage();
      const items = await $fetch(
        '/api/tournaments/all',
        {
          query: {
            page: this.currentPage,
            ...this.searchForm
          }
        }
      )
      this.setItems(this.items.concat(items.data))
    },
    async sendSearch({ form }: any) {
      const result = await $fetch(
          '/api/tournaments/all',
          {
            query: form
          }
      )
      this.reset()
      this.setTotal(result.meta.total)
      this.setItems(result.data)
      this.searchForm = form
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
      return await $fetch(
          '/api/tournaments/register',
          {
            method: 'POST',
            body: form
          }
      )
    },
    async start(tournament: TournamentModel) {
      return $fetch(
          `/api/tournaments/${tournament.id}/start`,
          {
            method: 'POST'
          }
      )
    },
    async unsubscribe(tournament_id: number) {
      return await $fetch(
          `/api/tournaments/${tournament_id}/unsubscribe`,
          {
            method: 'POST'
          }
      )
    },
    setCurrentTournament(tournament: any) {
      this.currentTournament = tournament
    }
  },
});
