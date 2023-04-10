export class BestOf {
    private constructor(private readonly id: string, private readonly libelle: number) {
    }

    static one(): BestOf {
        return new this('ONE', 1)
    }

    static three(): BestOf {
        return new this('THREE', 3)
    }

    static five(): BestOf {
        return new this('FIVE', 5)
    }
}