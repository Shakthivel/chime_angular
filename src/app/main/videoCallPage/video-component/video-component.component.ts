import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/core/services/audio-recording.service';
import { VideoRecordingService } from 'src/app/core/services/video-recording.service';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss']
})
export class VideoComponentComponent implements OnInit {


  @ViewChild('videoElement') videoElement: any;
  isCamOff:boolean = true;  
  video!: any;
  videoDisplay = 'none';
  videoRecordedTime!: any;
  videoBlobUrl!: any;
  videoBlob!: any;
  videoName!: any;
  videoStream!: MediaStream;
  videoConf = { video: { facingMode:"user", width: 540 }, audio: true}

  speakerOff:boolean = false; 
  micOff:boolean = true;
  shareOff:boolean = true;

  isScreenPinned:boolean = true;

  
  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer
  ) {

    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isCamOff = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      this.ref.detectChanges();
    });
  }

  ngOnInit(): void {
  }

  changeSpeakerStatus(){this.speakerOff = ! this.speakerOff;}
  changeMicStatus(){this.micOff = ! this.micOff;}
  changeScreenShareStatus(){this.shareOff = !this.shareOff;}
  changePinStatus(){
    this.isScreenPinned = !this.isScreenPinned;
  }

  startVideoRecording() {
    console.log("TEST")
    this.isCamOff = false;
    console.log(this.isCamOff)
    this.video = this.videoElement.nativeElement;
    this.video.controls = false;
    this.videoDisplay = 'block';
    this.videoRecordingService.startRecording(this.videoConf)
    .then(stream => {
        this.video.srcObject = stream;
        this.video.play();
    })
    .catch(function (err) {
        console.log(err.name + ": " + err.message);
    });
    
  }

  stopVideoRecording() {
      this.isCamOff = true;
      this.videoRecordingService.stopRecording();
      this.videoRecordingService.abortRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.videoDisplay = 'none';
  }

}
