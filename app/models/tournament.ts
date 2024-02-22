import {Level} from "~/app/vo/Level";
import {BestOf} from "~/app/vo/BestOf";
import {Format} from "~/app/vo/Format";
import {Participant} from "~/app/vo/Participant";
import {TeamModel} from "~/app/models/team.model";
import {MatchModel, MatchWithTeamsAndScoresModel} from "~/app/models/match.model";


export type TournamentModel = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    libelle: string,
    maxTeams: number,
    enroll: number,
    isHighlighted: boolean,
    state: string,
    skillLevel: string,
    speech: string,
    bestOf: string,
    format: string,
    beginAt: Date,
    challongeId: null|number,
    owner: number,
    imageBracket: null|string,
    teams?: TeamModel[],
    matches?: MatchModel[] | MatchWithTeamsAndScoresModel[],
    progress: string,
}

export type TournamentModelWithTeams = TournamentModel & {
    teams: TeamModel[]
}

export type TournamentModelWithMatches = TournamentModel & {
    matches: MatchModel[] | MatchWithTeamsAndScoresModel[]
}

export type TournamentModelWithMatchesAndTeams = TournamentModelWithMatches & TournamentModelWithTeams


class Tournament {
    levels(): Level[] {
        return [Level.all(),Level.beginner(), Level.amateur(), Level.semiPro(), Level.pro()]
    }

    bestOf(): BestOf[] {
        return [BestOf.one(), BestOf.three(), BestOf.five()]
    }

    formats(): Format[]
    {
        return [Format.oneVsOne(), Format.twoVsTwo(), Format.threeVsThree(), Format.fiveVsFive()]
    }

    participants(): Participant[]
    {
        return [Participant.height(), Participant.sixteen(), Participant.thirtyTwo(), Participant.sixtyFour()]
    }
}

export const tournament = new Tournament()