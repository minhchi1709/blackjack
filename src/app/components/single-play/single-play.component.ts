import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BackButtonComponent} from "../back-button/back-button.component";
import {Host} from "../../classes/host/host";
import {CardComponent} from "../card/card.component";
import {NgIf, NgStyle} from "@angular/common";
import {Card} from "../../classes/card/card";
import {LangService} from "../../services/lang-service/lang.service";
import {AnnouncementComponent} from "../announcement/announcement.component";
import {BalanceService} from "../../services/balance-service/balance.service";
import {WarningComponent} from "../warning/warning.component";

@Component({
  selector: 'app-single-play',
  standalone: true,
  imports: [
    BackButtonComponent,
    CardComponent,
    NgIf,
    NgStyle
  ],
  templateUrl: './single-play.component.html',
  styleUrl: './single-play.component.scss'
})
export class SinglePlayComponent implements OnInit{
  @ViewChild('person1', {read: ViewContainerRef, static: false}) person1Container !: ViewContainerRef;
  @ViewChild('person2', {read: ViewContainerRef, static: true}) person2Container !: ViewContainerRef;
  @ViewChild('container', {read: ViewContainerRef, static: true}) container !: ViewContainerRef;
  cards: ComponentRef<CardComponent>[] = []
  host: any
  init: boolean = false
  drawDisabled: boolean = true
  holdDisabled: boolean = true
  winner: number = 0
  end: boolean = false
  waiting: boolean = false
  playClicked: boolean = false
  lang: string = 'vn'
  betAmount: number = 0
  hasBet: boolean = false
  playLabel: Record<string, string> = {
    vi: 'Chơi nèo',
    en: 'Play'
  }
  drawLabel: Record<string, string> = {
    vi: 'Rút',
    en: 'Draw'
  }
  holdLabel: Record<string, string> = {
    vi: 'Dằn',
    en: 'Hold'
  }

  constructor(
    private langService: LangService,
    private balanceService: BalanceService
  ) {
  }

  ngOnInit(): void {
    this.lang = this.langService.getLang
    this.langService.currentLang$.subscribe(lang => {
      if (lang) {
        this.lang = lang
      }
    })
  }

  draw() {
    setTimeout(() => {
      this.host.draw()
      const card = this.person2Container.createComponent(CardComponent)
      card.instance.setCard = this.host.getHandoutCard()
      card.instance.showed = true
      if (this.host.getPlayer2.getTotalCards == 5) {
        this.drawDisabled = true
      }
      this.holdDisabled = this.checkHoldDisabled()
    }, 500)
    setTimeout(() => this.checkWinner(), 1000)
  }

  hold() {
    this.cards.forEach(card => {
      card.instance.showed = true
    })
    this.drawDisabled = true
    this.host.setHold = true
    this.host.draw(true)
    let cards: Card[] = []
    let card: Card
    do {
      card = this.host.getHandoutCard()
      if (card) cards.push(card)
    } while (card)
    for (let i = 0 ; i < cards.length; i++) {
      setTimeout(() => {
        const card = this.person1Container.createComponent(CardComponent)
        card.instance.setCard = cards[i]
        card.instance.showed = true
        this.cards.push(card)
      }, 500 + 500 * i)
    }
    setTimeout(() => this.checkWinner(), 500 * cards.length)
  }

  play() {
    if (this.waiting) {
      return
    }
    if (!this.hasBet) {
      const warning = this.container.createComponent(WarningComponent)
      setTimeout(() => warning.destroy(), 1500)
      return
    }
    this.playClicked = true
    this.waiting = true
    this.init = false
    this.end = false
    this.drawDisabled = true
    this.holdDisabled = true
    this.host = new Host()
    this.person1Container.clear()
    this.person2Container.clear()
    for (let i = 0 ; i < 4 ; i++) {
      setTimeout(() => {
        let card: ComponentRef<CardComponent>
        if (i % 2 == 0) {
          card = this.person1Container.createComponent(CardComponent)
        } else {
          card = this.person2Container.createComponent(CardComponent)
        }
        card.instance.setCard = this.host.getHandoutCard()
        if (i != 2) {
          card.instance.showed = true
        } else {
          this.cards.push(card)
        }
      }, 500 + 500 * i)
    }
    setTimeout(() => {
      this.waiting = false
      this.init = true
      this.drawDisabled = false
      this.holdDisabled = this.checkHoldDisabled()
      this.checkWinner(true)
    }, 2500)
  }

  checkHoldDisabled(): boolean {
    return !this.init || this.host.getHighestPoint(this.host.getPlayer2.getPoints) < 16
  }

  checkWinner(beginning: boolean = false) {
    this.winner = this.host.getWinner(beginning)
    if (this.winner >= 0) {
      const app = document.getElementById('app')
      let zIndex: string
      if (app) {
        app.style.backgroundColor = 'black'
        app.style.opacity = '0.9'
        zIndex = app.style.zIndex
        app.style.zIndex = '1000'
      }
      console.log(this.winner)
      this.end = true
      this.holdDisabled = true
      this.drawDisabled = true
      this.cards.forEach(card => {
        card.instance.showed = true
      })
      const announcement =  this.container.createComponent(AnnouncementComponent)
      announcement.instance.setType = this.winner
      announcement.instance.betAmount = this.betAmount
      this.betAmount = this.winner == 2 ? this.betAmount : (this.winner == 1 ? -this.betAmount : 0)
      this.balanceService.add(this.betAmount)
      setTimeout(() => {
        announcement.destroy()
        if (app) {
          app.style.background = 'none'
          app.style.opacity = '1'
          app.style.zIndex = zIndex
        }
      }, 1200)
      this.playClicked = false
      this.betAmount = 0
      this.hasBet = false
    }
  }

  addBet(bet: number) {
    if (!this.playClicked) {
      this.hasBet = true
      this.betAmount += bet
    }
  }
}
