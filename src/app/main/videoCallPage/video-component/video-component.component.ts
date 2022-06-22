import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/core/services/audio-recording.service';
import { VideoRecordingService } from 'src/app/core/services/video-recording.service';
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
  isCamOff: boolean = true;
  // video!: any;
  // videoDisplay = 'none';
  // videoRecordedTime!: any;
  // videoBlobUrl!: any;
  // videoBlob!: any;
  // videoName!: any;
  // videoStream!: MediaStream;
  // videoConf = { video: { facingMode:"user", width: 540 }, audio: true}
  //
  speakerOff: boolean = false;
  micOff: boolean = true;
  shareOff: boolean = true;

  isScreenPinned: boolean = true;

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

  //TODO: uncomment below
  // observer = {
  //   // videoTileDidUpdate is called whenever a new tile is created or tileState changes.
  //   videoTileDidUpdate: (tileState: any) => {
  //     // Ignore a tile without attendee ID and other attendee's tile.
  //     console.log('videoTileDidUpdate');
  //     console.log(tileState);
  //     if (!tileState.boundAttendeeId || !tileState.localTile) {
  //       return;
  //     }
  //     this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(tileState.tileId,this.videoElement.nativeElement);
  //     //videoElement-1, videoElement-2
  //   },
  //   audioVideoDidStart: (tileState: any) => {
  //     console.log('audioVideoDidStart()');
  //     console.log(tileState);
  //     this.meetingSessionService.meetingSession.audioVideo.startLocalVideoTile();
  //   },
  // };

  observer = {
    videoTileDidUpdate: (tileState: any) => {
      // Ignore a tile without attendee ID and videos.
      if (!tileState.boundAttendeeId || !tileState.isContent) {
        return;
      }

      const yourAttendeeId =
        this.meetingSessionService.meetingSession.configuration.credentials.attendeeId;

      // tileState.boundAttendeeId is formatted as "attendee-id#content".
      const boundAttendeeId = tileState.boundAttendeeId;

      // Get the attendee ID from "attendee-id#content".
      const baseAttendeeId = new DefaultModality(boundAttendeeId).base();
      if (baseAttendeeId === yourAttendeeId) {
        console.log('You called startContentShareFromScreenCapture');
      }
    },
    contentShareDidStart: () => {
      console.log('Screen share started');
    },
    contentShareDidStop: () => {
      console.log('Content share stopped');
    },
  };

  ngOnInit(): void {
    this.meetingSessionService
      .startAudioInput()
      .then(() => console.log('audio input started'));
    this.meetingSessionService.startAudioOutput().then(() => {
      console.log('audion output started');
      // this.meetingSessionService.meetingSession.audioVideo.bindAudioElement(this.audioElement);
    });
    this.meetingSessionService.meetingSession.audioVideo.addContentShareObserver(
      this.observer
    );
    this.meetingSessionService.meetingSession.audioVideo.addObserver(this.observer);
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
        DefaultVideoTile.connectVideoStreamToVideoElement(
          contentShareStream,
          this.videoElement.nativeElement,
          false
        );

    } else {
      await this.meetingSessionService.meetingSession.audioVideo.stopContentShare();
    }
  }
  changePinStatus() {
    this.isScreenPinned = !this.isScreenPinned;
  }
  //
  startVideoRecording() {
    //TODO: uncomment below
    this.isCamOff = false;
    // this.meetingSessionService.startVideoInput().then(()=>console.log('video input started')).then(()=>{
    //   this.meetingSessionService.meetingSession.audioVideo.addObserver(this.observer);
    //   this.meetingSessionService.meetingSession.audioVideo.start();
    // });
  }
  //
  stopVideoRecording() {
    this.isCamOff = true;
    this.meetingSessionService.stopVideoInput();
  }
}
