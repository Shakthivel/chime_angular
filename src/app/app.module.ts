import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestpageComponent } from './components/testpage/testpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
