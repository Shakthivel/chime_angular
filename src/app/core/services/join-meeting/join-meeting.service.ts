import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JoinMeetingService {

  private baseURL: string = 'http://localhost:3000/';

  private meeting = {};
  private attendee = {};

  constructor(private http: HttpClient) { }

  public setMeeting(meeting: any): void {
    this.meeting = meeting;
  }

  public setAttendee( attendee: any): void {
    this.attendee = attendee;
  }

  public getMeeting(): any {
    return this.meeting;
  }

  public getAttendee(): any {
    return this.attendee;
  }

  joinMeeting( meetingId: string, username: string) : Observable<any> {
    let region: string = 'us-east-1';
    let url = `${this.baseURL}join?title=${meetingId}&name=${username}&region=${region}&ns_es=true`;
    return this.http.post(url, {});
  }

}
