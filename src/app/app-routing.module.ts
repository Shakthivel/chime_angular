import { HomePageContentComponent } from './main/homePage/home-page-content/home-page-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMeetingComponent } from './main/createMeetingPage/create-meeting/create-meeting.component';
import { JoinMeetingComponent } from './main/joinMeetingPage/join-meeting/join-meeting.component';
import { PostMeetingComponent } from './main/post-meeting/post-meeting.component';
import { TestpageComponent } from './main/testpage/testpage.component';
import { VideoCallComponent } from './main/videoCallPage/video-call/video-call.component';

const routes: Routes = [
  { path: '', component: HomePageContentComponent },
  { path: 'join', component: JoinMeetingComponent },
  { path: 'create', component: CreateMeetingComponent },
  { path: 'test', component: TestpageComponent },
  { path: 'meet', component: VideoCallComponent },
  { path: 'leave', component: PostMeetingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
