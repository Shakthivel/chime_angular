import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantsComponentComponent } from './main/videoCallPage/participants-component/participants-component.component';
import { VideoCallComponent } from './main/videoCallPage/video-call/video-call.component';
import { VideoComponentComponent } from './main/videoCallPage/video-component/video-component.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoCallComponent,
    ParticipantsComponentComponent,
    VideoComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
