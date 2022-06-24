import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {JoinMeetingService} from "../../../core/services/join-meeting/join-meeting.service";
import {MeetingSessionService} from "../../../core/services/meeting-session/meeting-session.service";

@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.component.html',
  styleUrls: ['./join-meeting.component.scss']
})
export class JoinMeetingComponent implements OnInit {

  constructor(
    private router: Router,
    private joinMeetingService: JoinMeetingService,
    private meetingSessionService: MeetingSessionService
    ) { }

  ngOnInit(): void {
  }

  joinMeeting( meetingId: string, username: string): void {
    console.log('joinMeeting()');
    this.joinMeetingService.joinMeeting(meetingId, username ).subscribe(
      (data: any) => {
        let meeting: any = data['JoinInfo']['Meeting']['Meeting'];
        let attendee: any = data['JoinInfo']['Attendee']['Attendee'];
        this.joinMeetingService.setMeeting(meeting);
        this.joinMeetingService.setAttendee(attendee);
        this.meetingSessionService.setup(meeting, attendee);
        this.router.navigate(['/test']);
      },
      () => {}
    );
  }

}
