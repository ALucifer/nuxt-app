export class Level {
    private constructor(private readonly id: string, private readonly libelle: string) {}

    static all(): Level
    {
        return new this('Tous', 'Tous')
    }

    static beginner(): Level
    {
        return new this('Débutant', 'Débutant')
    }

    static amateur(): Level
    {
        return new this('Amateur', 'Amateur')
    }

    static semiPro(): Level
    {
        return new this('Semi-pro', 'Semi-pro')
    }

    static pro(): Level
    {
        return new this('Pro', 'Pro')
    }
}