import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { GuestComponent } from './guest.component';
import { FormComponent } from './form/form.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { GuestListComponent } from './guest-list/guest-list.component';
import {MessageService} from "primeng/api";


@NgModule({
  declarations: [GuestComponent, FormComponent, GuestListComponent],
  exports: [GuestComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    RatingModule,
    InputTextModule,
    RippleModule,
    ToolbarModule,
    ReactiveFormsModule,
    MultiSelectModule,
    AutoCompleteModule
  ],
  providers: [MessageService]
})
export class GuestModule { }
