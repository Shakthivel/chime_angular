import { TestBed } from '@angular/core/testing';

import { MeetingSessionService } from './meeting-session.service';

describe('MeetingSessionService', () => {
  let service: MeetingSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
