import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private langSource = new BehaviorSubject<string>('vi');
  currentLang$ = this.langSource.asObservable();

  constructor() { }

  public get getLang(): string {
    const lang = localStorage.getItem('lang')
    if (lang) {
      return lang
    } else {
      localStorage.setItem('lang', 'vi')
      return 'vi'
    }
  }

  public set setLang(lang: string) {
    localStorage.setItem('lang', lang)
    this.langSource.next(lang)
  }
}
