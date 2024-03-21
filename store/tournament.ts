import { defineStore } from "pinia";
import {type TournamentModel, type TournamentModelWithMatchesAndTeams} from "~/app/models/tournament";
import {type TeamModel} from "~/app/models/team.model";
import {useAsyncData} from "#app";

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
      const { data} = await useAsyncData(
          'tournament-list',
          () => $fetch('/api/tournaments/all'),
      )

      if (!data.value) {
        return
      }

      this.setItems(data.value.data)
      this.setTotal(data.value.meta.total)
    },
    async fetchTournament(id: number) {
      this.currentTournament = await $fetch(`/api/tournaments/${id}`)

      return this.currentTournament
    },
    async fetchNextItems() {
      this.incrementCurrentPage();
      const { data } = await useAsyncData(
    `tournament-list-${this.currentPage}`,
    () => $fetch(
      '/api/tournaments/all',
      {
        query: {
          page: this.currentPage,
          ...this.searchForm
        }
      }
      ))
      this.setItems(this.items.concat(data.value.data))
    },
    async sendSearch({ form }: any) {
      const { data } = await useAsyncData('search-tournament', () => $fetch(
          '/api/tournaments/all',
          {
            query: form
          }
      ))
      this.reset()
      this.setTotal(data.value.meta.total)
      this.setItems(data.value.data)
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
