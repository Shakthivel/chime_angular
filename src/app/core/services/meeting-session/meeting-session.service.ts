import { Injectable } from '@angular/core';
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
  VideoSource,
} from 'amazon-chime-sdk-js';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class MeetingSessionService {
  // Setup
  logger: ConsoleLogger | undefined;
  deviceController: DefaultDeviceController | undefined;

  meeting: any;
  attendee: any;
  configuration: any;
  meetingSession: any;
  hostId: string = '';

  //Devices
  audioInputDevices: any;
  audioOutputDevices: any;
  videoInputDevices: any;

  selectedAudioInput: any;
  selectedAudioOutput: any;
  selectedVideoInput: any;

  newParticipant = new Subject<any>();
  removeParticipant = new Subject<any>();
  participantCount = new Subject<number>();
  participants = new Subject<any>();

  baseURL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  setup(meeting: any, attendee: any): void {
    this.logger = new ConsoleLogger('MyLogger', LogLevel.OFF);
    this.deviceController = new DefaultDeviceController(this.logger);
    this.meeting = meeting;
    this.attendee = attendee;
    this.configuration = new MeetingSessionConfiguration(
      this.meeting,
      this.attendee
    );
    this.meetingSession = new DefaultMeetingSession(
      this.configuration,
      this.logger,
      this.deviceController
    );
  }

  async getAudioInputDevices(): Promise<any> {
    return await this.meetingSession.audioVideo.listAudioInputDevices();
  }

  async getAudioOutputDevices(): Promise<any> {
    return await this.meetingSession.audioVideo.listAudioOutputDevices();
  }

  async getVideoInputDevices(): Promise<any> {
    return await this.meetingSession.audioVideo.listVideoInputDevices();
  }

  setAudioInput(index: number): void {
    this.selectedAudioInput = this.audioInputDevices[index];
  }

  setAudioOutput(index: number): void {
    this.selectedAudioOutput = this.audioOutputDevices[index];
  }

  setVideoInput(index: number): void {
    this.selectedVideoInput = this.videoInputDevices[index];
  }

  async startAudioInput(): Promise<any> {
    await this.meetingSession.audioVideo.startAudioInput(
      this.selectedAudioInput['deviceId']
    );
  }

  async startAudioOutput(): Promise<any> {
    await this.meetingSession.audioVideo.chooseAudioOutput(
      this.selectedAudioOutput['deviceId']
    );
  }

  async startVideoInput(): Promise<any> {
    await this.meetingSession.audioVideo.startVideoInput(
      this.selectedVideoInput['deviceId']
    );
  }

  async stopVideoInput(): Promise<any> {
    await this.meetingSession.audioVideo.stopVideoInput(
      this.selectedVideoInput['deviceId']
    );
  }

  async updateParticipant() {
    this.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      (presentAttendeeId: any, present: boolean, externalUserId: string) => {
        console.log(
          `Attendee ID: ${presentAttendeeId} Present: ${present}, EUID: ${externalUserId}`
        );
      }
    );
  }

  endMeeting(): Observable<any> | false {
    let token = localStorage.getItem('meet-token');
    if (token) {
      let headers = new HttpHeaders().set('token', token);
      return this.http.post(`${this.baseURL}end?meet=${this.meeting.ExternalMeetingId}`, {}, {'headers': headers});
    }
    return false;
  }

}
