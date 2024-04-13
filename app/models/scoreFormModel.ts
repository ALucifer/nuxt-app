import type { TeamModel } from "./team.model";

export enum ScoreType {
    USER = "USER",
    FINAL = "FINAL"
}

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
    reporter: TeamModel|null,
    winner: TeamModel,
    looser: TeamModel,
    type: ScoreType
}