import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LangService} from "../../services/lang-service/lang.service";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    NgStyle,
    NgIf
  ],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent implements AfterViewInit{
  @ViewChild('announcement', {read: ElementRef, static: false}) announcement !: ElementRef;
  @ViewChild('bet', {read: ElementRef, static: false}) bet !: ElementRef;
  msg: string =  ''
  lang: string = 'vi'
  type !: number
  @Input() betAmount !: number
  @Input()
  set setType(type: number) {
    this.type = type
    this.msg = this.res[this.type][this.lang]
  }

  res: Record<number, Record<string, string>> = {
    0: {
      vi: 'HUỀ VỐN',
      en: 'TIED'
    },
    2: {
      vi: 'LỤM',
      en: 'WON'
    },
    1: {
      vi: 'LÒI CHÀNH',
      en: 'LOST'
    }
  }

  constructor(
    private langService: LangService,
  ) {
    this.lang = this.langService.getLang
  }

  ngAfterViewInit(): void {
    const ele1 = this.announcement.nativeElement
    const ele2 = this.bet.nativeElement
    for (let i = 1 ; i <= 60 ; i++) {
      setTimeout(() => {
        ele1.style.opacity = `${1 - i / 60}`
        ele2.style.opacity = `${1 - i / 60}`
        ele2.style.top = `${25 + i/16}rem`
      }, 50*i)
    }
  }

}
