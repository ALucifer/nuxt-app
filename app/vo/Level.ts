export class Level {
    private constructor(private readonly id: string, private readonly libelle: string) {}

    static all(): Level
    {
        return new this('ALL', 'Tous')
    }

    static beginner(): Level
    {
        return new this('BEGINNER', 'Débutant')
    }

    static amateur(): Level
    {
        return new this('AMATEUR', 'Amateur')
    }

    static semiPro(): Level
    {
        return new this('SEMI_PRO', 'Semi-pro')
    }

    static pro(): Level
    {
        return new this('PRO', 'Pro')
    }
}