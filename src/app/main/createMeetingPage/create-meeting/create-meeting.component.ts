import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  mail:String = "";
  constructor() {
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

}




