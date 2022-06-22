import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MeetingSessionService } from '../../../core/services/meeting-session/meeting-session.service';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss'],
})
export class VideoComponentComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('audioElement') audioElement: any;
  videoElements:HTMLVideoElement[] = [];
  
  isCamOff:boolean = true;
  speakerOff:boolean = false;
  micOff:boolean = true;
  shareOff:boolean = true;
  index = 0;
  @Input() participants: any;
  
  isScreenPinned:boolean = true;

  constructor(private meetingSessionService: MeetingSessionService) {}

  observer = {
    videoTileDidUpdate: (tileState: any) => {
      console.log('videoTileDidUpdate');
      console.log(tileState);
      if (!tileState.boundAttendeeId) {
        return;
      }
      this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(tileState.tileId,document.getElementById("videoElement_"+tileState.tileId) as HTMLVideoElement);
    },
    audioVideoDidStart: (tileState: any) => {
      console.log('audioVideoDidStart()');
      console.log(tileState);
      this.meetingSessionService.meetingSession.audioVideo.startLocalVideoTile();
    },
  };

  ngOnInit(): void {
    this.meetingSessionService.meetingSession.audioVideo.addObserver(this.observer);
  }

  async toggleCamera() {
    console.log('camera toggled', this.isCamOff);
    if (this.isCamOff) {
      await this.meetingSessionService.meetingSession.audioVideo.startVideoInput(
        this.meetingSessionService.selectedVideoInput
      );
      this.meetingSessionService.meetingSession.audioVideo.startLocalVideoTile();
    }
    else
      await this.meetingSessionService.meetingSession.audioVideo.stopVideoInput();
    this.isCamOff = !this.isCamOff;
  }

  changeSpeakerStatus(){
    this.speakerOff = ! this.speakerOff;
  }
  changeMicStatus(){this.micOff = ! this.micOff;}
  changeScreenShareStatus(){this.shareOff = !this.shareOff;}
  changePinStatus(){
    this.isScreenPinned = !this.isScreenPinned;
  }
  //
  startVideoRecording() {
    this.isCamOff=false;
    this.meetingSessionService.startVideoInput().then(()=>console.log('video input started')).then(()=>{
      this.meetingSessionService.meetingSession.audioVideo.startLocalVideoTile();
    });
  }
  //
  stopVideoRecording() {
    this.isCamOff=true;
    this.meetingSessionService.stopVideoInput();
    this.meetingSessionService.meetingSession.audioVideo.stopLocalVideoTile();
  }
}
