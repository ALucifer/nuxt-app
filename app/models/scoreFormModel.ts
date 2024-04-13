import type { TeamModel } from "./team.model";

export interface ScoreFormModel {
    id: number,
    matchId: number,
    winnerId: number,
    winnerScore: number,
    looserId: number,
    looserScore: number,
}

export interface ScoreModel extends ScoreFormModel {
    reporterId: number,
    reporter: TeamModel,
    winner: TeamModel,
    looser: TeamModel,
}