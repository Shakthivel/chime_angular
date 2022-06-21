import { Component, OnInit } from '@angular/core';
import { MeetingSessionService } from 'src/app/core/services/meeting-session/meeting-session.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-participants-component',
  templateUrl: './participants-component.component.html',
  styleUrls: ['./participants-component.component.scss'],
})
export class ParticipantsComponentComponent implements OnInit {
  attendees: any = {};
  constructor(private meetingSessionService: MeetingSessionService) {}

  ngOnInit(): void {
    this.meetingSessionService.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      (presentAttendeeId: any, present: boolean, externalUserId: string) => {
        console.log(
          `Attendee ID: ${presentAttendeeId} Present: ${present}, EUID: ${externalUserId}`
        );

        if (present) {
          this.attendees[presentAttendeeId] = externalUserId.split('#')[1];
        } else {
          delete this.attendees[presentAttendeeId];
        }
        console.log(this.attendees);
      }
    );
  }
}
