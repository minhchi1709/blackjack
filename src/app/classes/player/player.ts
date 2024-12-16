import {Card} from "../card/card";
import {CardService} from "../../services/card-service/card.service";

export class Player {
  private cards: Card[] = []
  private points: number[] = []
  private service: CardService = new CardService()

  constructor() {
  }

  public addCard(card: Card) {
    if (this.cards.length <= 4) {
      this.cards.push(card)
    }
    this.points = this.service.getPoints(this.cards)
  }

  public get getPoints() {
    return this.points
  }

  public get getTotalCards(): number {
    return this.cards.length
  }

  public get getCards(): Card[] {
    return this.cards
  }
}
