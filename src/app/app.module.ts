import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinMeetingComponent } from './main/joinMeetingPage/join-meeting/join-meeting.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestpageComponent } from './main/testpage/testpage.component';

@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent,
    JoinMeetingComponent
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
