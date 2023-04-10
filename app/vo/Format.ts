export class Format {
    private constructor(private readonly id: string, private readonly libelle: string) {}

    static oneVsOne(): Format
    {
        return new this('ONE_VS_ONE', '1 vs 1')
    }

    static twoVsTwo(): Format
    {
        return new this('TWO_VS_TWO', '2 vs 2')
    }

    static threeVsThree(): Format
    {
        return new this('THREE_VS_THREE', '3 vs 3')
    }

    static fiveVsFive(): Format
    {
        return new this('FOUR_VS_FOUR', '4 vs 4')
    }
}