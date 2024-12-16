import { Injectable } from '@angular/core';
import {Card} from "../../classes/card/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  private dict: Record<string, number>  = {
    A: 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    J: 10,
    Q: 10,
    K: 10
  }

  public getPoints(cards: Card[]): number[] {
    let result: number = 0
    let containA = false
    for (let card of cards) {
      if (card.getRank == 'A') {
        containA = true
      }
      const rank: string = card.getRank
      result += this.dict[rank]
    }
    return containA && result <= 11 ? [result, result + 10] : [result]
  }

  public get getDict() {
    return this.dict
  }
}
