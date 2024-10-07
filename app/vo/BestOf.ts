export class BestOf {
  private constructor(private readonly id: number, private readonly libelle: number) {
  }

  static one(): BestOf {
    return new this(1, 1)
  }

  static three(): BestOf {
    return new this(3, 3)
  }

  static five(): BestOf {
    return new this(5, 5)
  }
}
