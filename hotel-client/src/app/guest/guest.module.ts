import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [GuestComponent],
  exports: [GuestComponent],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class GuestModule { }
