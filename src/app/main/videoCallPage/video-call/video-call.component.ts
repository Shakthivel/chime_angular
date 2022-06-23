import { Component, OnInit } from '@angular/core';
import { DefaultModality } from 'amazon-chime-sdk-js';
import { MeetingSessionService } from '../../../core/services/meeting-session/meeting-session.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent implements OnInit {
  participants: any = {};

  constructor(private meetingSessionService: MeetingSessionService) {}

  ngOnInit(): void {
    this.meetingSessionService.meetingSession.audioVideo.start();
    this.meetingSessionService.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      (presentAttendeeId: string, present: boolean, externalUserId: string) => {
        if (present) {
          this.participants[presentAttendeeId] = externalUserId.split('#')[1];

          //this.participants[presentAttendeeId] = externalUserId
        } else {
          delete this.participants[presentAttendeeId];
        }
        console.log(presentAttendeeId);
        console.log(present);
        console.log(externalUserId);

     
          this.meetingSessionService.newParticipant.next({
            id: presentAttendeeId,
            username: externalUserId,
            present
          });
       
        this.meetingSessionService.participants.next(this.participants);
      }
    );
  }
}
