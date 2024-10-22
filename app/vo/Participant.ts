export class Participant {
  private constructor(private readonly id: number, private readonly libelle: string) {}

  static height(): Participant {
    return new this(8, '8')
  }

  static sixteen(): Participant {
    return new this(16, '16')
  }

  static thirtyTwo(): Participant {
    return new this(32, '32')
  }

  static sixtyFour(): Participant {
    return new this(64, '64')
  }
}
