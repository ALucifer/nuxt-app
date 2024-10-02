import type { TeamModel } from '~/app/models/team.model'

export const useTeam = () => {
  const getAvatar = (team?: TeamModel) => {
    return (team && team.avatar) ? 'data:image/svg+xml;base64,' + team.avatar : null
  }

  return { getAvatar }
}
