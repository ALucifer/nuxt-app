import {TeamModel} from "~/app/models/team.model";
import {ScoreModel} from "~/app/models/scoreFormModel";

export interface MatchModel {
    id: number,
    created_at: Date,
    updated_at: Date,
    tournament_id: number,
    adversaire_a: number,
    adversaire_b: number,
    state: string,
    team_a?: TeamModel,
    team_b?: TeamModel
}

export interface MatchWithTeamsAndScoresModel extends MatchModel {
    team_a: TeamModel,
    team_b: TeamModel,
    scores: ScoreModel[]
}