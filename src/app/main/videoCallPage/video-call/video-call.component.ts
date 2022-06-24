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
    this.meetingSessionService.getAudioInputDevices().then(data=> {
      this.meetingSessionService.audioInputDevices = data;
      this.meetingSessionService.setAudioInput(0);
    });
    this.meetingSessionService.getAudioOutputDevices().then(data=> {
      this.meetingSessionService.audioOutputDevices = data;
      this.meetingSessionService.setAudioOutput(0);
    });
    this.meetingSessionService.getVideoInputDevices().then(data=> {
      this.meetingSessionService.videoInputDevices = data;
      this.meetingSessionService.setVideoInput(0);
    });
    this.meetingSessionService.meetingSession.audioVideo.start();
    this.meetingSessionService.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      (presentAttendeeId: string, present: boolean, externalUserId: string) => {
        if (present) {
          this.participants[presentAttendeeId] = externalUserId.split('#')[1];
        } else {
          delete this.participants[presentAttendeeId];
        }

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
