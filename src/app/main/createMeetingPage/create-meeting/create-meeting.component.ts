import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  mail:String = "";
  constructor(private router: Router) {
   }

  meetingId:String ="xxx-yyy-zzz";

  ngOnInit(): void {
  }

  generateMeetingId(){
    //this.meetingId = uuid(); //format in a pattern
    return this.meetingId;
  }
  
  verify(str:String)
  {
    console.log(str);
  }

  redirectToTest(){
    this.router.navigate(['/test']);
  }

}




