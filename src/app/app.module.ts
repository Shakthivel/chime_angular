import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantsComponentComponent } from './main/videoCallPage/participants-component/participants-component.component';
import { VideoCallComponent } from './main/videoCallPage/video-call/video-call.component';
import { VideoComponentComponent } from './main/videoCallPage/video-component/video-component.component';
import { JoinMeetingComponent } from './main/joinMeetingPage/join-meeting/join-meeting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestpageComponent } from './main/testpage/testpage.component';
import { CreateMeetingComponent } from './main/createMeetingPage/create-meeting/create-meeting.component';
import { PostMeetingComponent } from './main/post-meeting/post-meeting.component';
import { ClipboardModule } from "@angular/cdk/clipboard";
@NgModule({
  declarations: [
    AppComponent,
    JoinMeetingComponent,
    CreateMeetingComponent,
    VideoCallComponent,
    ParticipantsComponentComponent,
    VideoComponentComponent,
    TestpageComponent,
    PostMeetingComponent
  ],
  imports: [
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
