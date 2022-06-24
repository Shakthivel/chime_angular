
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MeetingSessionService } from '../../../core/services/meeting-session/meeting-session.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss'],
})

export class VideoComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('audioElement') audioElement: any;
  @ViewChild('aEl') aEl: any;
  @ViewChild('videoGrid') videoGrid: any;

  isCamOff: boolean = true;
  speakerOff: boolean = false;
  micOff: boolean = true;
  shareOff: boolean = true;
  index = 0;
  url: string = 'meetingurl.com';

  tileStorage: any = {};

  isScreenPinned: boolean = true;
  presenterId: any;

  constructor(private router: Router, private meetingSessionService: MeetingSessionService) {}

  observer = {
    videoTileDidUpdate: (tileState: any) => {
      if (!tileState.boundAttendeeId) {
        return;
      }
      // if (tileState.isContent) this.presenterId = tileState.boundAttendeeId;
      this.tileStorage[tileState.boundAttendeeId] = tileState.tileId;

      let checkElement = document.getElementById(
        'videoElement_' + tileState.boundAttendeeId
      );
      console.log(tileState);
      console.log(checkElement);
      if (!checkElement) {
        console.log('creating tile element');
        let element = document.createElement('div');
        element.className = 'grid_video_card';
        let video = document.createElement('video');
        video.className = 'grid_videoElement';
        video.id = 'videoElement_' + tileState.boundAttendeeId;
        element.id = 'divVid_' + tileState.boundAttendeeId;
        this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(
          tileState.tileId,
          video as HTMLVideoElement
        );
        element.appendChild(video);
        document.getElementById('grid-video-section')?.appendChild(element);
        console.log(element);
      } else {
        console.log('binding with existing element');
        this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(
          tileState.tileId,
          document.getElementById(
            'videoElement_' + tileState.boundAttendeeId
          ) as HTMLVideoElement
        );
      }
    },
    videoTileWasRemoved: (tileId: number) => {
      console.log('video tile remove is triggered');

      // let key: string = '';
      // Object.keys(this.tileStorage).forEach((item) => {
      //   if (this.tileStorage[item] === tileId) {
      //     key = item;
      //   }
      // });


      // document.getElementById('divVid_' + key)?.remove();

      // delete this.tileStorage[key];

    },
    audioVideoDidStop: (sessionStatus: any) => {
      // See the "Stopping a session" section for details.
      console.log(
        'Stopped with a session status code: ',
        sessionStatus.statusCode()
      );
    },
    contentShareDidStart: () => {
      console.log('Screen share started');
    },
    contentShareDidStop: () => {
      // console.log(this.presenterId);
      // document.getElementById('divVid_' + this.presenterId)?.remove();
      // document.getElementById('videoElement_' + this.presenterId)?.remove();
      console.log('Content share stopped');
    },
    audioVideoDidStart: async () => {
      await this.meetingSessionService.startAudioOutput();
      console.log('a/v Started');
    },
  };

  isHost(): boolean {
    return this.meetingSessionService.hostId === this.meetingSessionService['attendee']['AttendeeId'];
  }

  ngOnInit(): void {
    this.url = 'http://localhost:4200/?meetId='+this.meetingSessionService.meeting.ExternalMeetingId;
    this.meetingSessionService.meetingSession.audioVideo.addObserver(
      this.observer
    );
    this.meetingSessionService.meetingSession.audioVideo.addContentShareObserver(
      this.observer
    );
    this.meetingSessionService.newParticipant.subscribe((data: any) => {
      let checkElement = document.getElementById('divVid_' + data.id);
      if (!checkElement && data.present) {
        console.log('creating empty element');
        let element = document.createElement('div');
        element.className = 'grid_video_card';
        let video = document.createElement('video');
        video.className = 'grid_videoElement';
        video.id = 'videoElement_' + data.id;
        element.id = 'divVid_' + data.id;
        element.appendChild(video);
        document.getElementById('grid-video-section')?.appendChild(element);
        console.log(element);
      }else if(!data.present){
        document.getElementById('divVid_' + data.id)?.remove();
      }
    });
    this.meetingSessionService.meetingSession.audioVideo.start();
  }

  ngAfterViewInit() {
    this.meetingSessionService.meetingSession.audioVideo.bindAudioElement(
      this.aEl.nativeElement
    );
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

  leaveMeeting() {
    this.meetingSessionService.meetingSession.audioVideo.stop();
    this.router.navigate(['/leave']);
  }

  endMeeting() {
    let endMeet = this.meetingSessionService.endMeeting();
    if(endMeet) {
      endMeet.subscribe(
        () => {
          this.meetingSessionService.meetingSession.audioVideo.stop();
          document.getElementById('leaveModal')
          this.router.navigate(['/leave']);
        }, () => {
          console.log('invalid access');
        }
      );
    }
  }

  getUrl() {
    return this.url;
  }
}
