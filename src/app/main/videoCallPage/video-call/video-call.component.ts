import { Component, OnInit } from '@angular/core';
import { DefaultModality } from 'amazon-chime-sdk-js';
import {MeetingSessionService} from "../../../core/services/meeting-session/meeting-session.service";

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

  participants: any = {};


  constructor( private meetingSessionService: MeetingSessionService) { }

  ngOnInit(): void {
    this.meetingSessionService.meetingSession.audioVideo.start();
    this.meetingSessionService.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      (presentAttendeeId: string, present: boolean, externalUserId: string) => {
        if (present) {
          this.participants[presentAttendeeId] = externalUserId.split('#')[1];
        } else {
          delete this.participants[presentAttendeeId];
        }
      }
    );
  }


}
