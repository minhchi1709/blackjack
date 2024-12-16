import { Component } from '@angular/core';
import {LangService} from "../../services/lang-service/lang.service";

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.scss'
})
export class WarningComponent {

  lang: string = 'vi'
  msg: Record<string, string> = {
    vi: 'CHƯA CƯỢC KÌA NÍ OI',
    en: 'YOU HAVE NOT BET YET'
  }

  constructor(
    private langService: LangService,
  ) {
    this.lang = this.langService.getLang
  }
}
