import { Component, OnInit } from '@angular/core';
import { DefaultModality } from 'amazon-chime-sdk-js';
import {MeetingSessionService} from "../../../core/services/meeting-session/meeting-session.service";

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

  participants: any = {};

  // observer = {
  //   videoTileDidUpdate: (tileState: any) => {
  //     console.log('videoTileDidUpdate');
  //     console.log(tileState);
  //     if (!tileState.boundAttendeeId) {
  //       return;
  //     }
  //     this.meetingSessionService.meetingSession.audioVideo.bindVideoElement(tileState.tileId,document.getElementById("videoElement_"+tileState.tileId) as HTMLVideoElement);
  //   }
  // }

  constructor( private meetingSessionService: MeetingSessionService) { }

  ngOnInit(): void {
    // this.meetingSessionService.meetingSession.audioVideo.addObserver(this.observer);
    this.meetingSessionService.meetingSession.audioVideo.start();
    this.meetingSessionService.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      (presentAttendeeId: string, present: boolean, externalUserId: string) => {
        if (present) {
          this.participants[presentAttendeeId] = externalUserId.split('#')[1];
        } else {
          delete this.participants[presentAttendeeId];
        }
      }
    );
  }

  // setupSubscribeToAttendeeIdPresenceHandler(): void {
  //   const handler = (
  //     attendeeId: string,
  //     present: boolean,
  //     externalUserId: string,
  //     dropped: boolean
  //   ): void => {
  //     console.log(`${attendeeId} present = ${present} (${externalUserId})`);
  //     const isContentAttendee = new DefaultModality(attendeeId).hasModality(
  //       DefaultModality.MODALITY_CONTENT
  //     );
  //     const isSelfAttendee =
  //       new DefaultModality(attendeeId).base() === this.meetingSessionService.meetingSession.configuration.credentials.attendeeId
  //       || new DefaultModality(attendeeId).base() === this.meetingSessionService.meetingSession.primaryMeetingSessionCredentials?.attendeeId
  //     if (!present) {
  //       this.roster.removeAttendee(attendeeId);        
  //       this.log(`${attendeeId} dropped = ${dropped} (${externalUserId})`);
  //       return;
  //     }
  //     //If someone else share content, stop the current content share
  //     if (
  //       !this.allowMaxContentShare() &&
  //       !isSelfAttendee &&
  //       isContentAttendee &&
  //       this.isButtonOn('button-content-share')
  //     ) {
  //       this.contentShareStop();
  //     }
  //     const attendeeName =  externalUserId.split('#').slice(-1)[0] + (isContentAttendee ? ' «Content»' : '');
  //     this.roster.addAttendee(attendeeId, attendeeName);

  //     this.audioVideo.realtimeSubscribeToVolumeIndicator(
  //       attendeeId,
  //       async (
  //         attendeeId: string,
  //         volume: number | null,
  //         muted: boolean | null,
  //         signalStrength: number | null
  //       ) => {
  //         if (muted !== null) {
  //           this.roster.setMuteStatus(attendeeId, muted);
  //         }
  //         if (signalStrength !== null) {
  //           this.roster.setSignalStrength(attendeeId, Math.round(signalStrength * 100));
  //         }
  //       }
  //     );
  //   };

  //   this.meetingSessionService.meetingSession.attendeeIdPresenceHandler = handler;
  //   this.meetingSessionService.meetingSession.realtimeSubscribeToAttendeeIdPresence(handler);

  //   };

  //   const scoreHandler = (scores: { [attendeeId: string]: number }) => {};

  //   this.audioVideo.subscribeToActiveSpeakerDetector(
  //     new DefaultActiveSpeakerPolicy(),
  //     this.activeSpeakerHandler,
  //     scoreHandler,
  //     this.showActiveSpeakerScores ? 100 : 0
  //   );
  // }

}
