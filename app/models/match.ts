export type MatchModel = {
    id: number,
    created_at: Date,
    updated_at: Date,
    tournament_id: number,
    adversaire_a: number,
    adversaire_b: number,
    state: string,
    team_a?: any,
    team_b?: any
}