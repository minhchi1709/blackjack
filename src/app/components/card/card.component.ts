import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Card} from "../../classes/card/card";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  protected card: Card = new Card('', 0)
  suitSrc: string = ''

  @Input() showed: boolean = false

  @Input()
  set setCard(card: Card) {
    this.card = card
    this.suitSrc = `assets/cards/${this.getSuitIcon(this.card.getSuit)}.png`
  }

  private getSuitIcon(suit: number) {
    switch(suit) {
      case 0:
        return 'club'
      case 1:
        return 'spade'
      case 2:
        return 'diamond'
      case 3:
        return 'heart'
    }
    return ''
  }

}
