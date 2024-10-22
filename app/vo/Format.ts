export class Format {
  private constructor(private readonly id: string, private readonly libelle: string) {}

  static oneVsOne(): Format {
    return new this('1 vs 1', '1 vs 1')
  }

  static twoVsTwo(): Format {
    return new this('2 vs 2', '2 vs 2')
  }

  static threeVsThree(): Format {
    return new this('3 vs 3', '3 vs 3')
  }

  static fiveVsFive(): Format {
    return new this('4 vs 4', '4 vs 4')
  }
}
