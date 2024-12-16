import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  constructor(
    private router: Router,
  ) {
  }

  back() {
    this.router.navigate(['/'])
  }
}
