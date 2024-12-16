import { Component } from '@angular/core';
import {BackButtonComponent} from "../back-button/back-button.component";

@Component({
  selector: 'app-multiple-play',
  standalone: true,
  imports: [
    BackButtonComponent
  ],
  templateUrl: './multiple-play.component.html',
  styleUrl: './multiple-play.component.scss'
})
export class MultiplePlayComponent {

}
