import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AudioRecordingService } from 'src/app/core/services/audio-recording.service';
import { VideoRecordingService } from 'src/app/core/services/video-recording.service';
import {MeetingSessionService} from "../../core/services/meeting-session/meeting-session.service";

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {

  @ViewChild('videoElement') videoElement: any;
  video!: any;
  isPlaying = false;
  videoDisplay = 'none';
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime!: any;
  videoRecordedTime!: any;
  audioBlobUrl!: any;
  videoBlobUrl!: any;
  audioBlob!: any;
  videoBlob!: any;
  audioName!: any;
  videoName!: any;
  audioStream!: any;
  videoStream!: MediaStream;
  audioConf = { audio: true}
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true}

  constructor(
    private router: Router,
    private meetingSessionService: MeetingSessionService
  ) {}

  ngOnInit() {
    this.meetingSessionService.getAudioInputDevices().then(data=> {
      this.meetingSessionService.audioInputDevices = data;
      this.meetingSessionService.setAudioInput(0);
    });
    this.meetingSessionService.getAudioOutputDevices().then(data=> {
      this.meetingSessionService.audioOutputDevices = data;
      this.meetingSessionService.setAudioOutput(0);
    });
    this.meetingSessionService.getVideoInputDevices().then(data=> {
      this.meetingSessionService.videoInputDevices = data;
      this.meetingSessionService.setVideoInput(0);
    });
  }
  observer = {
    // videoTileDidUpdate is called whenever a new tile is created or tileState changes.
    videoTileDidUpdate: (tileState: any) => {
      // Ignore a tile without attendee ID and other attendee's tile.
      console.log('videoTileDidUpdate')
      console.log(tileState);
      if (!tileState.boundAttendeeId || !tileState.localTile) {
        return;
      }
      this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(tileState.tileId,this.videoElement.nativeElement);
    },
    audioVideoDidStart: (tileState: any) => {
      console.log('audioVideoDidStart()')
      console.log(tileState)
      this.meetingSessionService.meetingSession.audioVideo.startLocalVideoTile();
    }
  };

  startVideoRecording() {
    this.isVideoRecording = true;
    this.videoDisplay = 'block';
    this.meetingSessionService.startVideoInput().then(()=>console.log('video input started')).then(()=>{
      this.meetingSessionService.meetingSession.audioVideo.addObserver(this.observer);
      this.meetingSessionService.meetingSession.audioVideo.start();
    });
  }

  stopVideoRecording(){
    this.isVideoRecording = false;
    this.videoDisplay = 'none';
    this.meetingSessionService.meetingSession.audioVideo.stop();
    this.meetingSessionService.stopVideoInput();
  }


  downloadVideoRecordedData() {
    this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
  }

  startAudioRecording() {
    this.isAudioRecording = true;
    // if (!this.isAudioRecording) {
    //   this.isAudioRecording = true;
    //   this.audioRecordingService.startRecording();
    // }
  }

  abortAudioRecording() {
    this.isAudioRecording = false;
    // if (this.isAudioRecording) {
    //   this.isAudioRecording = false;
    //   this.audioRecordingService.abortRecording();
    // }
  }

  stopAudioRecording() {
    this.isAudioRecording = false;
    // if (this.isAudioRecording) {
    //   this.audioRecordingService.stopRecording();
    //   this.isAudioRecording = false;
    // }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
  }

  downloadAudioRecordedData() {
    this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    //this.video.srcObject = stream;
    //const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  redirectToMeet(){
    this.router.navigate(["/meet"]);
  }
}