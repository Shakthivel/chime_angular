import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MeetingSessionService } from '../../../core/services/meeting-session/meeting-session.service';
import { DefaultModality, DefaultVideoTile } from 'amazon-chime-sdk-js';

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
      this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(tileState.tileId,document.getElementById("videoElement_"+tileState.boundAttendeeId) as HTMLVideoElement);
    },
    contentShareDidStart: () => {
      console.log('Screen share started');
    },
    contentShareDidStop: () => {
      console.log('Content share stopped');
    },
  };

  ngOnInit(): void {
     this.meetingSessionService.meetingSession.audioVideo.addContentShareObserver(
       this.observer
     );
    this.meetingSessionService.meetingSession.audioVideo.addObserver(this.observer);
  }


  changeSpeakerStatus() {
    this.speakerOff = !this.speakerOff;
  }
  changeMicStatus() {
    this.micOff = !this.micOff;
  }

  async changeScreenShareStatus() {
    this.shareOff = !this.shareOff;
    if (!this.shareOff) {
      const contentShareStream =
        await this.meetingSessionService.meetingSession.audioVideo.startContentShareFromScreenCapture();
        console.log("after the prompt");
        
        // DefaultVideoTile.connectVideoStreamToVideoElement(
        //   contentShareStream,
        //   this.videoElement.nativeElement,
        //   false
        // );

    } else {
      await this.meetingSessionService.meetingSession.audioVideo.stopContentShare();
    }

  }
  changePinStatus() {
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
    this.isCamOff = true;
    this.meetingSessionService.stopVideoInput();
    this.meetingSessionService.meetingSession.audioVideo.stopLocalVideoTile();
  }
}
