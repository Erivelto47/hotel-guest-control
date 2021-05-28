import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavModule} from './shared/nav/nav.module';
import { GuestModule } from './guest/guest.module';
import {CheckinModule} from './checkin/checkin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NavModule,
    GuestModule,
    CheckinModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
