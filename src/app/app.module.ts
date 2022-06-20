import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateMeetingComponent } from './main/createMeetingPage/create-meeting/create-meeting.component';
import { JoinMeetingComponent } from './main/joinMeetingPage/join-meeting/join-meeting.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinMeetingComponent,
    CreateMeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
