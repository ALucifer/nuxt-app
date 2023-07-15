export interface ScoreFormModel {
    match_id: number,
    winner_id: number,
    winner_score: number,
    looser_id: number,
    looser_score: number,
}

export interface ScoreModel extends ScoreFormModel {
    reporter_id: number,
}