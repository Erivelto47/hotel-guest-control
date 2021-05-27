import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import {CheckinComponent} from './checkin/checkin.component';

const routes: Routes = [
  {
    path: 'guest',
    component: GuestComponent
  },
  {
    path: 'checkin',
    component: CheckinComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
