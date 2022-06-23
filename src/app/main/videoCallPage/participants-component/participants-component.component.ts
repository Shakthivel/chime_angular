import {Component, Input, OnInit} from '@angular/core';
import { MeetingSessionService } from 'src/app/core/services/meeting-session/meeting-session.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-participants-component',
  templateUrl: './participants-component.component.html',
  styleUrls: ['./participants-component.component.scss'],
})
export class ParticipantsComponentComponent implements OnInit {

  @Input() participants: any;

  constructor(private meetingSessionService: MeetingSessionService) {}

  ngOnInit(): void {
    console.log(this.participants);
  }

  partLen(){
    return Object.keys(this.participants).length;
  }

  
}