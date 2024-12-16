import {Component, OnInit} from '@angular/core';
import {BalanceService} from "../../services/balance-service/balance.service";
import {DatePipe} from "@angular/common";
import {LangService} from "../../services/lang-service/lang.service";

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss'
})
export class BalanceComponent implements OnInit{
  balance !: number
  date !: string
  time !: string
  lang: string = 'vi'

  constructor(
    private balanceService: BalanceService,
    private datePipe: DatePipe,
    private langService: LangService,
  ) {
    this.lang = this.langService.getLang
    this.formatDate()
  }

  ngOnInit(): void {
    this.balanceService.update()
    this.balance = this.balanceService.getBalance
    this.langService.currentLang$.subscribe(lang => {
      if (lang) {
        this.lang = lang
        this.formatDate()
      }
    })
    this.balanceService.balance$.subscribe(balance => {
      if (balance) {
        this.balance = balance
      }
    })
    setInterval(() => {
      this.formatDate()
    }, 1000)
  }

  private formatDate() {
    this.date = this.datePipe.transform(new Date(), 'EEEE, dd/MM/yyyy', undefined, this.lang) || ''
    this.time = this.datePipe.transform(new Date(), 'mediumTime', undefined, this.lang) || ''
  }
}
