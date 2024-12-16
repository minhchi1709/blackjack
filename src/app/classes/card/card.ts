export class Card {
  private readonly rank: string
  private readonly suit: number

  constructor(rank: string, suit: number) {
    this.rank = rank
    this.suit = suit
  }

  public get getRank(): string {
    return this.rank
  }

  public get getSuit(): number {
    return this.suit
  }

  public equals(other: Card): boolean {
    return this.rank === other.rank && this.suit === other.suit
  }
}
