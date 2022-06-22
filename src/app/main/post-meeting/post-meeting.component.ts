import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-meeting',
  templateUrl: './post-meeting.component.html',
  styleUrls: ['./post-meeting.component.scss']
})
export class PostMeetingComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  joinMeeting() {
    this.router.navigate(['/join']);
  }
}
