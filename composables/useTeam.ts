import type { TeamModel } from "~/app/models/team.model";

export default function useTeam()
{
    function getAvatar(team?: TeamModel) {
        return (team && team.avatar) ?  'data:image/svg+xml;base64,' + team.avatar : null
    }

    return { getAvatar }
}