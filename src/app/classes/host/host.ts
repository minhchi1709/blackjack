import {Player} from "../player/player";
import {CardService} from "../../services/card-service/card.service";
import {Card} from "../card/card";

export class Host {
  private readonly player1: Player
  private readonly player2: Player
  service: CardService
  cards: Card[] = []
  handoutCards: Card[] = []
  hold: boolean = false
  p: Record<number, number> = {
    15: 1,
    16: 0.9,
    17: 0.8,
    18: 0.15,
    19: 0.05,
    20: 0.01,
    21: 0
  }

  constructor() {
    this.player1 = new Player()
    this.player2 = new Player()
    this.service = new CardService()
    this.init()
  }

  public set setHold(hold: boolean) {
    this.hold = hold
  }

  public get getPlayer1(): Player {
    return this.player1
  }

  public get getPlayer2(): Player {
    return this.player2
  }

  public draw(host: boolean = false) {
    if (host) {
      while(this.player1.getTotalCards < 5) {
        if (this.getHighestPoint(this.player1.getPoints) < 15) {
          this.player1.addCard(this.getRandomCard())
        } else if (this.getHighestPoint(this.player1.getPoints) > 21) {
          break
        } else {
          const shouldDraw = Math.random() <= this.p[this.getHighestPoint(this.player1.getPoints)]
          if (shouldDraw) {
            this.player1.addCard(this.getRandomCard())
          } else {
            break
          }
        }

      }
    } else {
      if (this.player2.getTotalCards < 5) {
        this.player2.addCard(this.getRandomCard())
      }
    }
  }

  public getWinner(beginning: boolean = false): number {
    let winner1: boolean
    let winner2: boolean
    if (beginning) {
      winner1 = this.checkWinAA(this.player1.getCards)
      winner2 = this.checkWinAA(this.player2.getCards)
      let res = this.checkWinner(winner1, winner2)
      if (res) return res

      winner1 = this.checkWinPrior(this.player1.getCards)
      winner2 = this.checkWinPrior(this.player2.getCards)
      res = this.checkWinner(winner1, winner2)
      if (res) return res
      return -1
    } else {
      const point1 = this.getHighestPoint(this.player1.getPoints)
      const point2 = this.getHighestPoint(this.player2.getPoints)

      if (point2 > 21) return 1

      if (this.hold) {
        if (point1 > 21) return 2
        if (this.player1.getTotalCards == 5 && this.player2.getTotalCards == 5) {
          if (point1 == point2) return 0
          if (point1 > point2) return 2
          if (point2 > point1) return 1
        }
        if (point1 == point2) return 0
        if (point1 > point2) return 1
        if (point2 > point1) return 2
      }
      return -1
    }
  }

  public getHighestPoint(points: number[]): number {
    return points[points.length - 1]
  }

  private checkWinner(winner1: boolean, winner2: boolean): number {
    if (winner1 && winner2) {
      return 0
    }
    if (winner1) {
      return 1
    }
    if (winner2) {
      return 2
    }
    return 0
  }

  private checkWinAA(cards: Card[]): boolean {
    if (cards.length == 2) {
      let hasA = false
      for (let card of cards) {
        if (card.getRank == 'A') {
          if (hasA) {
            return true
          }
          hasA = true
        }
      }
    }
    return false
  }

  private checkWinPrior(cards: Card[]): boolean {
    if (cards.length == 2) {
      let hasA = false
      let has10 = false
      for (let card of cards) {
        if (card.getRank == 'A') {
          hasA = true
        }
        if (card.getRank == '10' || card.getRank == 'J' || card.getRank == 'Q' || card.getRank == 'K') {
          has10 = true
        }
      }
      return hasA && has10
    }
    return false
  }

  private init() {
    for(let k of Object.keys(this.service.getDict)) {
      for (let i = 0 ; i < 4 ; i++) {
        this.cards.push(new Card(k, i))
      }
    }

    for (let i = 0 ; i < 4; i++) {
      if (i % 2 == 0) {
        this.player1.addCard(this.getRandomCard())
      } else {
        this.player2.addCard(this.getRandomCard())
      }
    }
  }

  public getHandoutCard(): Card | null {
    if (this.handoutCards.length == 0) {
      return null
    }
    const card = this.handoutCards[0]
    this.handoutCards = this.handoutCards.slice(1)
    return card
  }

  private removeCard(card: Card) {
    for (let i = 0 ; i < this.cards.length; i++) {
      if (this.cards[i].equals(card)) {
        this.cards = this.cards.slice(0, i).concat(this.cards.slice(i + 1))
        break
      }
    }
    this.handoutCards.push(card)
  }

  private getRandomCard(): Card {
    const i = Math.floor(Math.random() * this.cards.length)
    const card = this.cards[i]
    this.removeCard(card)
    return card
  }

  private containCard(card: Card): boolean {
    for (let c of this.cards) {
      if (c.equals(card)) {
        return true
      }
    }
    return false
  }
}
