import type { TournamentModel } from './tournament'
import type { TeamModel } from '~/app/models/team.model'
import type { ScoreModel } from '~/app/models/scoreFormModel'

export enum State {
  OPEN = 'OPEN',
  VALIDATION = 'VALIDATION',
  NEED_VALIDATION = 'NEED_VALIDATION',
  FINISH = 'FINISH',
}

export interface MatchModel {
  id: number
  created_at: Date
  updated_at: Date
  tournament_id: number
  adversaireA: number
  adversaireB: number
  state: string
  team_a?: TeamModel
  team_b?: TeamModel
}

export interface MatchWithTeamsAndScoresModel extends MatchModel {
  team_a: TeamModel
  team_b: TeamModel
  scores: ScoreModel[]
  tournament: TournamentModel
}
