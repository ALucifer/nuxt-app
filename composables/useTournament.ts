import {find} from "lodash"
import useDate from "~/composables/useDate";
import {TournamentModel, TournamentModelWithMatches, TournamentModelWithMatchesAndTeams} from "~/app/models/tournament";
import {TeamModel} from "~/app/models/team.model";
import {MatchWithTeamsAndScoresModel} from "~/app/models/match.model";

export default function useTournament() {
    const date = useDate()
    const {getUser, isLogged} = useSecurity()

    function isHalf(tournament: TournamentModel) {
        return (
            tournament.enroll >= tournament.max_teams / 2 &&
            tournament.state === "OPEN" &&
            tournament.image_bracket === null &&
            isOwner(tournament)
        )
    }

    function canBeStarted(tournament: TournamentModel) {
        return (
            isHalf(tournament)
            && isOwner(tournament)
            && tournament.state === 'OPEN'
            && tournament.image_bracket === null
        )
    }

    function isOpen(tournament: TournamentModel) {
        return tournament.state === "OPEN" && tournament.challonge_id !== null && date.isAfterNow(tournament.begin_at)
    }

    function isOwner(tournament: TournamentModel) {
        return isLogged() && tournament.owner === getUser().id
    }

    function isRegister(tournament: TournamentModel) {
        return isLogged() && find(tournament.teams, (t) => t.user_id === getUser().id)
    }

    function hasMatches(tournament: TournamentModelWithMatches) {
        return tournament.matches?.length > 0
    }

    function isValid(tournament: TournamentModel) {
        return ['OPEN', 'RUNNING'].includes(tournament.state) && tournament.challonge_id !== null
    }

    function isCompletlyClose(tournament: TournamentModel) {
        const valid = isValid(tournament)

        if (!valid) {
            return true
        }

        return !isRunning(tournament) && date.isBeforeNow(tournament.begin_at);
    }

    function isRunning(tournament: TournamentModel) {
        return tournament.state === 'RUNNING'
    }

    function getTeam(team_id: number, teams: TeamModel[]) {
        return teams.find((team) => team.id == team_id)
    }

    function findUserMatchFromMatches(matches: MatchWithTeamsAndScoresModel[], user_id: number) {
        const matchesWithUser: MatchWithTeamsAndScoresModel[] = []

        matches.forEach((item) => {
            if (item.team_a.user_id === user_id || item.team_b.user_id === user_id) {
                matchesWithUser.push(item)
            }
        })

        return matchesWithUser
    }

    function isComplete(tournament: TournamentModel) {
        return tournament.enroll === tournament.teams?.length
    }

    function isUserLoggedInMatch(match: MatchWithTeamsAndScoresModel)
    {
        return isLogged() && (match.team_a.user_id === getUser().id || match.team_b.user_id === getUser().id)
    }

    return {
        isHalf,
        isOwner,
        isRegister,
        hasMatches,
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