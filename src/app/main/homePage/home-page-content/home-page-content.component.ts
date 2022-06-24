import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import {map} from "rxjs";
import {JoinMeetingService} from "../../../core/services/join-meeting/join-meeting.service";
import {MeetingSessionService} from "../../../core/services/meeting-session/meeting-session.service";


@Component({
  selector: 'app-home-page-content',
  templateUrl: './home-page-content.component.html',
  styleUrls: ['./home-page-content.component.scss']
})
export class HomePageContentComponent implements OnInit {

  constructor(
    private router: Router,
    private queryAccess: ActivatedRoute,
    private meetingSessionService: MeetingSessionService,
    private joinMeetingService: JoinMeetingService) { }

  meetingId: string = '';


  ngOnInit(): void {
    this.queryAccess.queryParams.
      pipe( map((data) => {
        return data['meetId'];
    })).subscribe((meetId) => {
      this.meetingId = meetId;
    })
  }

  getButton(): string {
    if( this.meetingId && this.meetingId.trim().length!==0) {
      return 'Join Meeting';
    }
    return 'Create Meeting';
  }

  createOrJoinMeeting(username: string) : any {
    if(username.trim().length !== 0) {
      if(this.meetingId && this.meetingId.trim().length!==0) {
        this.joinMeetingService.joinMeeting(this.meetingId, username ).subscribe(
          (data: any) => {
            let meeting: any = data['JoinInfo']['Meeting']['Meeting'];
            let attendee: any = data['JoinInfo']['Attendee']['Attendee'];
            this.joinMeetingService.setMeeting(meeting);
            this.joinMeetingService.setAttendee(attendee);
            this.meetingSessionService.setup(meeting, attendee);
            this.router.navigate(['/meet']);
          }
        );
      } else {
        this.joinMeetingService.joinMeeting( uuidv4(), username).subscribe(
          (data: any) => {
            let meeting: any = data['JoinInfo']['Meeting']['Meeting'];
            let attendee: any = data['JoinInfo']['Attendee']['Attendee'];
            this.joinMeetingService.setMeeting(meeting);
            this.joinMeetingService.setAttendee(attendee);
            this.meetingSessionService.setup(meeting, attendee);
            this.router.navigate(['/meet']);
          }
        );
      }
    } else {
      //TODO: Enter Username Toaster
    }

    // this.router.navigate(['/join']);
  }

}
