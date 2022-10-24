export const TournamentLevels = {
  ALL: 'Tous',
  BEGINNER: 'Débutant',
  AMATEUR: 'Amateur',
  SEMI_PRO: 'Semi-pro',
  PRO: 'Pro',
  get selectValues() {
    return [
      { id: this.ALL, libelle: this.ALL },
      { id: this.BEGINNER, libelle: this.BEGINNER },
      { id: this.AMATEUR, libelle: this.AMATEUR },
      { id: this.SEMI_PRO, libelle: this.SEMI_PRO },
      { id: this.PRO, libelle: this.PRO }
    ]
  }
}

export const BestOf = {
  ONE: 1,
  THREE: 3,
  FIVE: 5,
  get selectValues() {
    return [
      { id: this.ONE, libelle: this.ONE },
      { id: this.THREE, libelle: this.THREE },
      { id: this.FIVE, libelle: this.FIVE }
    ]
  }
}

export const TournamentFormat = {
  ONE_VS_ONE: '1 vs 1',
  TWO_VS_TWO: '2 vs 2',
  THREE_VS_THREE: '3 vs 3',
  FOUR_VS_FOUR: '4 vs 4',
  get selectValues() {
    return [
      { id: this.ONE_VS_ONE, libelle: this.ONE_VS_ONE },
      { id: this.TWO_VS_TWO, libelle: this.TWO_VS_TWO },
      { id: this.THREE_VS_THREE, libelle: this.THREE_VS_THREE },
      { id: this.FOUR_VS_FOUR, libelle: this.FOUR_VS_FOUR }
    ]
  }
}

export const TournamentParticipants = {
  get selectValues() {
    return [
      { id: 8, libelle: "8" },
      { id: 16, libelle: "16" },
      { id: 32, libelle: "32" },
      { id: 64, libelle: "64" },
    ]
  }
}