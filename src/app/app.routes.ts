import { Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {SinglePlayComponent} from "./components/single-play/single-play.component";
import {MultiplePlayComponent} from "./components/multiple-play/multiple-play.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'single-play',
    component: SinglePlayComponent
  },
  {
    path: 'multiple-play',
    component: MultiplePlayComponent
  },
  {
    path: '**',
    component: MainComponent
  }
];
