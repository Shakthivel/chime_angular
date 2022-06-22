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
  constructor(private meetingSessionService: MeetingSessionService) {
    this.meetingSessionService.updateParticipant();
  }

  ngOnInit(): void {

  }
}
