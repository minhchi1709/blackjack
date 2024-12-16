import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {LangService} from "../../services/lang-service/lang.service";

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [],
  templateUrl: './lang.component.html',
  styleUrl: './lang.component.scss'
})
export class LangComponent implements OnInit, AfterViewInit{
  @ViewChildren('lang') langButtons !: QueryList<ElementRef>;
  lang: string = 'vi'
  constructor(private langService: LangService) {
  }

  ngAfterViewInit(): void {
    this.change(this.lang)
  }

  ngOnInit(): void {
    this.lang = this.langService.getLang
  }

  change(lang: string) {
    this.langButtons.forEach(btn => {
      const ele: HTMLButtonElement = btn.nativeElement
      if (ele.id == lang) {
        ele.classList.add('active-lang')
      } else {
        ele.classList.remove('active-lang')
      }
    })
    this.langService.setLang = lang
  }
}
