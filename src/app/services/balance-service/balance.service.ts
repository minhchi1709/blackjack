import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balanceSource = new BehaviorSubject<number>(this.getBalance);
  balance$ = this.balanceSource.asObservable();

  constructor() { }

  public update() {
    const now = new Date();
    const last = localStorage.getItem('lastUpdated');
    if (last) {
      const lastUpdated = new Date(last)
      lastUpdated.setDate(lastUpdated.getDate() + 1)
      if (now > lastUpdated) {
        this.add(1000)
        localStorage.setItem('lastUpdated', now.toISOString())
      }
    } else {
      localStorage.setItem('lastUpdated', now.toISOString())
    }
  }

  public get getBalance(): number {
    const balance = localStorage.getItem('balance');
    if (balance) {
      return Number(balance)
    } else {
      localStorage.setItem('balance', '10000');
      return 10000
    }
  }

  public add(bet: number) {
    let balance = this.getBalance
    balance += bet
    localStorage.setItem('balance', `${balance}`);
    this.balanceSource.next(this.getBalance);
  }
}
