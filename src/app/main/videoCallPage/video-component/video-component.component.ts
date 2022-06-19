import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss']
})
export class VideoComponentComponent implements OnInit {


  speakerOff:boolean = false; 
  micOff:boolean = true;
  camOff:boolean = true;
  shareOff:boolean = true;

  isScreenPinned:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeSpeakerStatus(){this.speakerOff = ! this.speakerOff;}
  changeMicStatus(){this.micOff = ! this.micOff;}
  changeCamStatus(){this.camOff = !this.camOff;}
  changeScreenShareStatus(){this.shareOff = !this.shareOff;}
  changePinStatus(){
    this.isScreenPinned = !this.isScreenPinned;
  }
}
