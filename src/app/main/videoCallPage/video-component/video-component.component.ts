import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MeetingSessionService } from '../../../core/services/meeting-session/meeting-session.service';
import { DefaultModality, DefaultVideoTile } from 'amazon-chime-sdk-js';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss'],
})
export class VideoComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('audioElement') audioElement: any;
  @ViewChild('aEl') aEl: any;
  videoElements: HTMLVideoElement[] = [];

  isCamOff: boolean = true;
  speakerOff: boolean = false;
  micOff: boolean = true;
  shareOff: boolean = true;
  index = 0;
  @Input() participants: any;

  isScreenPinned: boolean = true;

  constructor(private meetingSessionService: MeetingSessionService) {}

  observer = {
    videoTileDidUpdate: (tileState: any) => {
      console.log('videoTileDidUpdate');
      console.log(tileState);
      if (!tileState.boundAttendeeId) {
        return;
      }
      this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(
        tileState.tileId,
        document.getElementById(
          'videoElement_' + tileState.boundAttendeeId
        ) as HTMLVideoElement
      );
    },
    contentShareDidStart: () => {
      console.log('Screen share started');
    },
    contentShareDidStop: () => {
      console.log('Content share stopped');
    },
    audioVideoDidStart: async () => {
      await this.meetingSessionService.startAudioOutput();
      console.log('a/v Started');
    },
  };

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.meetingSessionService.meetingSession.audioVideo.addContentShareObserver(
      this.observer
    );
    this.meetingSessionService.meetingSession.audioVideo.addObserver(
      this.observer
    );
    this.meetingSessionService.meetingSession.audioVideo.bindAudioElement(
      this.aEl.nativeElement
    );

    this.meetingSessionService.meetingSession.audioVideo.start();
    console.log('audiovideo start is called');
  }

  changeSpeakerStatus() {
    this.speakerOff = !this.speakerOff;
  }
  async changeMicStatus() {
    if (this.micOff) {
      console.log('mic is on');
      await this.meetingSessionService.startAudioInput();
      this.meetingSessionService.meetingSession.audioVideo.realtimeUnmuteLocalAudio();
    } else {
      this.meetingSessionService.meetingSession.audioVideo.realtimeMuteLocalAudio();
    }

    this.micOff = !this.micOff;
  }

  async changeScreenShareStatus() {
    this.shareOff = !this.shareOff;
    if (!this.shareOff) {
      const contentShareStream =
        await this.meetingSessionService.meetingSession.audioVideo.startContentShareFromScreenCapture();
      console.log('after the prompt');

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
    this.isCamOff = false;
    this.meetingSessionService
      .startVideoInput()
      .then(() => console.log('video input started'))
      .then(() => {
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
