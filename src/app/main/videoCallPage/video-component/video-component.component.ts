import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/core/services/audio-recording.service';
import { VideoRecordingService } from 'src/app/core/services/video-recording.service';
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
  // video!: any;
  // videoDisplay = 'none';
  // videoRecordedTime!: any;
  // videoBlobUrl!: any;
  // videoBlob!: any;
  // videoName!: any;
  // videoStream!: MediaStream;
  // videoConf = { video: { facingMode:"user", width: 540 }, audio: true}
  //
  speakerOff:boolean = false;
  micOff:boolean = true;
  shareOff:boolean = true;
  index = 0;
  
  isScreenPinned:boolean = true;

  constructor(
    // private ref: ChangeDetectorRef,
    // private audioRecordingService: AudioRecordingService,
    // private videoRecordingService: VideoRecordingService,
    // private sanitizer: DomSanitizer,
    private meetingSessionService: MeetingSessionService
  ) {
    //
    // this.videoRecordingService.recordingFailed().subscribe(() => {
    //   this.isCamOff = false;
    //   this.ref.detectChanges();
    // });
    //
    // this.videoRecordingService.getRecordedTime().subscribe((time) => {
    //   this.videoRecordedTime = time;
    //   this.ref.detectChanges();
    // });
    //
    // this.videoRecordingService.getStream().subscribe((stream) => {
    //   this.videoStream = stream;
    //   this.ref.detectChanges();
    // });
    //
    // this.videoRecordingService.getRecordedBlob().subscribe((data) => {
    //   this.videoBlob = data.blob;
    //   this.videoName = data.title;
    //   this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
    //   this.ref.detectChanges();
    // });
  }

  observer = {
    // videoTileDidUpdate is called whenever a new tile is created or tileState changes.
    videoTileDidUpdate: (tileState: any) => {
      // Ignore a tile without attendee ID and other attendee's tile.
      console.log('videoTileDidUpdate');
      console.log(tileState);
      if (!tileState.boundAttendeeId) {
        return;
      }
      this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(tileState.tileId,document.getElementById("videoElement_"+tileState.tileId) as HTMLVideoElement);
      //videoElement-1, videoElement-2
    },
    audioVideoDidStart: (tileState: any) => {
      console.log('audioVideoDidStart()');
      console.log(tileState);
      this.meetingSessionService.meetingSession.audioVideo.startLocalVideoTile();
    },
  };

  ngOnInit(): void {
    this.meetingSessionService.meetingSession.audioVideo.addObserver(this.observer);
    this.meetingSessionService.startAudioInput().then(()=>console.log('audio input started'));
    this.meetingSessionService.startAudioOutput().then(()=> {
      console.log('audion output started');
      // this.meetingSessionService.meetingSession.audioVideo.bindAudioElement(this.audioElement);
    });
    
  }

  // async toggleCamera() {
  //   console.log('camera toggled', this.isCamOff);
  //   if (this.isCamOff) {
  //     await this.meetingSessionService.meetingSession.audioVideo.startVideoInput(
  //       this.meetingSessionService.selectedVideoInput
  //     );
  //     this.meetingSessionService.meetingSession.audioVideo.startLocalVideoTile();
  //   }
  //   //pass the tile html elem as param here
  //   else
  //     await this.meetingSessionService.meetingSession.audioVideo.stopVideoInput();
  //   this.isCamOff = !this.isCamOff;
  // }

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
      this.meetingSessionService.meetingSession.audioVideo.start();
    });
  }
  //
  stopVideoRecording() {
    this.isCamOff=true;
    this.meetingSessionService.stopVideoInput();
  }
}
