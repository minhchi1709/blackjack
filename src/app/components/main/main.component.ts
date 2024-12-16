import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {LangService} from "../../services/lang-service/lang.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  lang: string = 'vn'
  single: Record<string, string> = {
    en: 'SINGLE PLAY',
    vi: 'Chơi mụt mình'
  }
  multiple: Record<string, string> = {
    en: 'MULTIPLE PLAY',
    vi: 'Chơi cùng bạn'
  }

  constructor(
    private langService: LangService,
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

}
