import {Level} from "~/app/vo/Level";
import {BestOf} from "~/app/vo/BestOf";
import {Format} from "~/app/vo/Format";
import {Participant} from "~/app/vo/Participant";


export type TournamentModel = {
    id: number,
    created_at: Date,
    updated_at: Date,
    libelle: string,
    max_teams: number,
    enroll: number,
    is_highlighted: boolean,
    state: string,
    skill_level: any,
    speech: string,
    best_of: any,
    format: any,
    begin_at: Date,
    challonge_id: null|number,
    owner: number,
    image_bracket: null|string
}


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