import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LangComponent} from "./components/lang/lang.component";
import {BalanceComponent} from "./components/balance/balance.component";
import {registerLocaleData} from "@angular/common";
import localeVi from '@angular/common/locales/vi';
import localeEn from '@angular/common/locales/en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LangComponent, BalanceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'poker';

  constructor() {
    registerLocaleData(localeVi)
    registerLocaleData(localeEn)
  }
}
