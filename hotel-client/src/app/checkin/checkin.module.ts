import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckinComponent} from './checkin.component';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [CheckinComponent],
  exports: [CheckinComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    TableModule,
    InputNumberModule,
    RadioButtonModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputMaskModule,
    CalendarModule,
    RippleModule,
    InputTextModule,
    CheckboxModule
  ]
})
export class CheckinModule {
}
