import {find} from "lodash"
import type { TournamentModel } from "~/app/models/tournament";
import type { TeamModel } from "~/app/models/team.model";
import type { MatchWithTeamsAndScoresModel } from "~/app/models/match.model";

export const useTournament = () => {
    const date = useDate()
    const {getUser, isLogged} = useSecurity()

    const isHalf = (tournament: TournamentModel) => {
        return (
            tournament.enroll >= tournament.maxTeams / 2 &&
            tournament.state === "OPEN" &&
            tournament.imageBracket === null &&
            isOwner(tournament)
        )
    }

    const canBeStarted = (tournament: TournamentModel) => {
        return (
            isHalf(tournament)
            && isOwner(tournament)
            && tournament.state === 'OPEN'
            && tournament.imageBracket === null
        )
    }

    const isOpen = (tournament: TournamentModel) => {
        return tournament.state === "OPEN" && tournament.challongeId !== null && date.isAfterNow(tournament.beginAt)
    }

    const isOwner = (tournament: TournamentModel) => {
        return isLogged() && tournament.owner === getUser().id
    }

    const isRegister = (tournament: TournamentModel) => {
        return isLogged() && !!find(tournament.teams, (t: TeamModel) => t.userId === getUser().id)
    }

    const isCompletlyClose = (tournament: TournamentModel) => {
        return tournament.state !== 'OPEN' && date.isBeforeNow(tournament.beginAt);
    }

    const isRunning = (tournament: TournamentModel) => {
        return tournament.state === 'RUNNING'
    }

    const getTeam = (team_id: number, teams: TeamModel[]) => {
        return teams.find((team) => team.id == team_id)
    }

    const findUserMatchFromMatches = (matches: MatchWithTeamsAndScoresModel[], user_id: number) => {
        const matchesWithUser: MatchWithTeamsAndScoresModel[] = []

        matches.forEach((item) => {
            if (item.team_a.userId === user_id || item.team_b.userId === user_id) {
                matchesWithUser.push(item)
            }
        })

        return matchesWithUser
    }

    const isComplete = (tournament: TournamentModel) => {
        return tournament.enroll === tournament.maxTeams
    }

    const isUserLoggedInMatch = (match: MatchWithTeamsAndScoresModel) => {
        return isLogged() && (match.team_a.userId === getUser().id || match.team_b.userId === getUser().id)
    }

    return {
        isOwner,
        isRegister,
        isCompletlyClose,
        isOpen,
        isRunning,
        getTeam,
        findUserMatchFromMatches,
        canBeStarted,
        isComplete,
        isUserLoggedInMatch
    }
}
